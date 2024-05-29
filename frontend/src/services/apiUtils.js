// apiUtils.js
export const handleApiError = (error) => {
  if (error.response) {
    console.error("API Response Error:", error.response.data);
    console.error("API Response Status:", error.response.status);
    console.error("API Response Headers:", error.response.headers);
    throw new Error(error.response.data.detail || "API request failed");
  } else if (error.request) {
    console.error("No response received:", error.request);
    throw new Error("No response from server");
  } else {
    console.error("Error in setting up request:", error.message);
    throw new Error("API request setup failed");
  }
};
export default handleApiError;
