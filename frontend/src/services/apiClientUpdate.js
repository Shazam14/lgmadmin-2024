// src/services/apiClientUpdate.js
import axios from "axios";
import Cookies from "js-cookie";

// Constants
const ENDPOINTS = {
  PORTAL: "/portal/",
  PORTAL_REFRESH: "/portal/token/refresh/",
  ADMIN_REFRESH: "/token/refresh/",
};

const ROUTES = {
  PORTAL_LOGIN: "/portal-login",
  ADMIN_LOGIN: "/admin-login",
};

// Helper functions
const isPortalEndpoint = (url) => url.startsWith(ENDPOINTS.PORTAL);

const getBaseURL = () => {
  if (window.location.origin.includes("systems.learninggardenmontessori.ph")) {
    return "https://backend.learninggardenmontessori.ph/api";
  }
  return process.env.REACT_APP_API_BASE_URL;
};

// Create API client
const apiClientUpdate = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Single request interceptor for auth
apiClientUpdate.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const isPortal = isPortalEndpoint(config.url);
    const token = isPortal
      ? Cookies.get("portal_access_token")
      : Cookies.get("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add timestamp for debugging
    config.metadata = { startTime: new Date() };

    return config;
  },
  (error) => Promise.reject(error)
);

// Single response interceptor combining auth refresh and logging
apiClientUpdate.interceptors.response.use(
  (response) => {
    // Log request duration
    const duration = new Date() - response.config.metadata.startTime;
    console.debug(`Request to ${response.config.url} took ${duration}ms`);

    return response;
  },
  async (error) => {
    // Handle 401 errors and token refresh
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        const isPortal = isPortalEndpoint(originalRequest.url);

        // Get refresh token
        const refreshToken = Cookies.get(
          isPortal ? "portal_refresh_token" : "refresh_token"
        );

        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        // Get new access token
        const response = await axios.post(
          `${getBaseURL()}${isPortal ? ENDPOINTS.PORTAL_REFRESH : ENDPOINTS.ADMIN_REFRESH}`,
          { refresh: refreshToken },
          { withCredentials: true }
        );

        const { access } = response.data;

        // Update token
        Cookies.set(isPortal ? "portal_access_token" : "access_token", access);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return apiClientUpdate(originalRequest);
      } catch (refreshError) {
        // Clear auth and redirect on refresh failure
        const isPortal = isPortalEndpoint(originalRequest.url);

        if (isPortal) {
          Cookies.remove("portal_access_token");
          Cookies.remove("portal_refresh_token");
          window.location.href = ROUTES.PORTAL_LOGIN;
        } else {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          window.location.href = ROUTES.ADMIN_LOGIN;
        }

        return Promise.reject(refreshError);
      }
    }

    // Log other errors
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config.url,
      });
    }

    return Promise.reject(error);
  }
);

export default apiClientUpdate;
