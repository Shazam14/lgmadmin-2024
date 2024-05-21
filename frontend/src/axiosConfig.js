import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true, // Ensures cookies are sent with the request
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request Config:", config);
    const token = Cookies.get("access_token");
    console.log("Access Token:", token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("Access token not found");
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = Cookies.get("refresh_token");
        if (refreshToken) {
          console.log("Refreshing access token...");
          const response = await axios.post("/api/refresh-token", {
            refreshToken,
          });
          const newAccessToken = response.data.accessToken;
          Cookies.set("access_token", newAccessToken);
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(error.config);
        } else {
          console.warn("Refresh token not found");
          // Handle the case when refresh token is not available
          // For example, redirect the user to the login page
          window.location.href = "/login";
        }
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError);
        // Handle refresh token error
        // For example, redirect the user to the login page
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
