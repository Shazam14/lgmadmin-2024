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

const getToken = (isPortal) => {
  try {
    return isPortal
      ? Cookies.get("portal_access_token")
      : Cookies.get("access_token");
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

const getBaseURL = () => {
  const productionDomain = "systems.learninggardenmontessori.ph";
  const productionAPI = "https://backend.learninggardenmontessori.ph/api";

  return window.location.origin.includes(productionDomain)
    ? productionAPI
    : process.env.REACT_APP_API_BASE_URL;
};

// Create API client
const apiClientUpdate = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
apiClientUpdate.interceptors.request.use(
  async (config) => {
    const isPortal = isPortalEndpoint(config.url);
    const token = getToken(isPortal);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClientUpdate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only attempt refresh once
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    try {
      originalRequest._retry = true;
      const isPortal = isPortalEndpoint(originalRequest.url);

      // Get refresh token
      const refreshToken = Cookies.get(
        isPortal ? "portal_refresh_token" : "refresh_token"
      );

      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      // Attempt token refresh
      const response = await axios.post(
        `${getBaseURL()}${isPortal ? ENDPOINTS.PORTAL_REFRESH : ENDPOINTS.ADMIN_REFRESH}`,
        { refresh: refreshToken },
        { withCredentials: true }
      );

      // Set new access token
      const { access } = response.data;
      Cookies.set(isPortal ? "portal_access_token" : "access_token", access);

      // Retry original request
      originalRequest.headers.Authorization = `Bearer ${access}`;
      return apiClientUpdate(originalRequest);
    } catch (refreshError) {
      console.error("Token refresh failed:", refreshError);

      // Clear tokens based on endpoint type
      if (isPortalEndpoint(originalRequest.url)) {
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
);

// Add error event handler
apiClientUpdate.interceptors.request.use(
  (config) => {
    // Add request timestamp for timeout tracking
    config.metadata = { startTime: new Date() };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClientUpdate.interceptors.response.use(
  (response) => {
    // Track request duration
    const duration = new Date() - response.config.metadata.startTime;
    console.debug(`Request to ${response.config.url} took ${duration}ms`);
    return response;
  },
  (error) => {
    // Enhanced error logging
    if (error.response) {
      console.error("Response Error:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
        url: error.config.url,
      });
    }
    return Promise.reject(error);
  }
);

export default apiClientUpdate;
