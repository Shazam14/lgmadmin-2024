import axios from "axios";

// const apiClient = axios.create({
//   baseURL: "http://192.168.0.148:8004/api",
//   withCredentials: true,
// });

// export default apiClient;

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8004/api",
  withCredentials: true,
});

export default apiClient;
