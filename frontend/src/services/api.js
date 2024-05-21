import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Get the Access token from storage (local/session storage or cookie)
const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// Get the Refresh token from storage (local/session storage or cookie)
const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

// Update the Access token in storage
const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

// Refresh the Access token using the Refresh token
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();

  try {
    const response = await axios.post("/api/refresh", { refreshToken });
    const { accessToken } = response.data;
    setAccessToken(accessToken);
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error;
  }
};

// Check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  return Date.now() >= exp * 1000; // Convert to milliseconds
};

// Add a request interceptor to handle expired Access tokens
api.interceptors.request.use(
  async (config) => {
    let accessToken = getAccessToken();

    if (accessToken && isTokenExpired(accessToken)) {
      try {
        accessToken = await refreshAccessToken();
      } catch (error) {
        console.error("Failed to refresh access token:", error);
        // Optional: Redirect to login or other error handling
      }
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
