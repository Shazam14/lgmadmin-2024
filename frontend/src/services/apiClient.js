import axios from "axios";

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
});
export default apiClient;
