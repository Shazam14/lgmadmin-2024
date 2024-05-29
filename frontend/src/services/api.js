// src/api/axiosConfig.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="));
  if (token) {
    config.headers["Authorization"] = `Bearer ${token.split("=")[1]}`;
  }

  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="));
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken.split("=")[1];
  }
  return config;
});

export default axiosInstance;
