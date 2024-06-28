import axios from "axios";

const getBaseURL = () => {
  if (window.location.origin.includes("systems.learninggardenmontessori.ph")) {
    return "https://backend.learninggardenmontessori.ph/api";
  } else {
    return "http://192.168.0.148:8004/api/";
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
