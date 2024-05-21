// apiUtils.js
export const handleApiError = (error) => {
  if (error.response) {
    console.error("API Error:", error.response.data);
    throw new Error(error.response.data.detail || "API request failed");
  } else if (error.request) {
    console.error("No response received:", error.request);
    throw new Error("No response from server");
  } else {
    console.error("Error in setting up request:", error.message);
    throw new Error("API request setup failed");
  }
};
