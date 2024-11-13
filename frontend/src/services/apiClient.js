import axios from "axios";

console.log("API CLIENT LOCAL URL:", process.env.REACT_APP_API_BASE_URL);

const getBaseURL = () => {
  if (window.location.origin.includes("systems.learninggardenmontessori.ph")) {
    return "https://backend.learninggardenmontessori.ph/api";
  } else {
    return process.env.REACT_APP_API_BASE_URL;
  }
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable sending cookies with the request
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
});
apiClient.interceptors.response.use(
  (response) => {
    console.log("API CLIENT Response:", response);
    return response;
  },
  (error) => {
    console.error("API CLIENT Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
