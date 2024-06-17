// src/services/api.js

import { getCookieValue } from "./apiUtils";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log("THIS IS API URIL API.JS", API_BASE_URL);
const api = {
  fetchData: async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}/${endpoint}`;
    const accessToken = getCookieValue("access_token");
    console.log(accessToken, "this is the accessToken");

    const defaultOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };

    const mergedOptions = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, mergedOptions);
      const data = await response.json();

      if (data.username) {
        localStorage.setItem('username', data.username);
      }
      
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      throw error;
    }
  },
};

export default api;
