import axios from "axios";
import Cookies from "js-cookie";

const getBaseURL = () => {
  const protocol = window.location.protocol === "https:" ? "https" : "http";
  const hostname = window.location.hostname;

  console.log(protocol, "Returning PROTOCOL AXIOS CONFIG");

  if (hostname === "testlgms.learninggardenmontessori.ph") {
    return `${protocol}://testadmin.learninggardenmontessori.ph/api`;
  } else {
    return `${protocol}://192.168.1.2:8001/api`;
  }
};

const baseURL = getBaseURL();
console.log(baseURL, "axiosConfig --<>Base URL:");

const axiosConfig = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosConfig;
