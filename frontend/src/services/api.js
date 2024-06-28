// src/services/api.js

import { getCookieValue } from "./apiUtils";


const getBaseURL = () => {
  if (window.location.origin.includes("systems.learninggardenmontessori.ph")) {
    return process.env.REACT_APP_API_BASE_URL_CLOUD;
  } else {
    return process.env.REACT_APP_API_BASE_URL;
  }
};

const API_BASE_URL = getBaseURL();
console.log(API_BASE_URL);

const api = {
  fetchData: async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}/${endpoint}`;
    const accessToken = getCookieValue("access_token");

    const defaultOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const mergedOptions = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, mergedOptions);
      const data = await response.json();

      if (data.username) {
        localStorage.setItem("username", data.username);
      }

      return data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    }
  },

  get: async (endpoint, options = {}) => {
    return await api.fetchData(endpoint, { ...options, method: "GET" });
  },

  post: async (endpoint, body, options = {}) => {
    return await api.fetchData(endpoint, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },
};

export default api;
