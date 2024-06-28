import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://192.168.1.5:8001/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable sending cookies with the request
});
export default apiClient;
