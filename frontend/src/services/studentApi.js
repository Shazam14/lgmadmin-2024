import axios from "axios";
import handleApiError from "../services/apiUtils";

const API_BASE_URL = "http://192.168.1.2:8001/api";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

export const fetchStudents = async () => {
  console.log(`${process.env.REACT_APP_API_BASE_URL}`, "checking the URL");

  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/students/`,
    {
      credentials: "include", // Include credentials (cookies) in the request
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
    }
  );

  console.log("getting response", response);

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  const data = await response.json();
  console.log("api js gives:", data);

  return data;
};

export const fetchStudentslast = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students/`, {
      withCredentials: true,
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
    });
    console.log("Printing response from student API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);

    if (error.response) {
      // The request was made, and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);

      if (error.response.status === 401) {
        // Token is invalid or expired, redirect to login page
        window.location.href = "/admin-login";
      } else {
        handleApiError(error);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      handleApiError(error);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
      handleApiError(error);
    }
  }
};

export const fetchStudentByStudentId = async (studentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students/${studentId}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchParentDetails = async (parentUrl) => {
  try {
    const response = await axios.get(parentUrl);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateStudent = async (studentId, updatedData) => {
  try {
    const response = await axios.put(`/students/${studentId}/`, updatedData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchTeachers = async () => {
  try {
    const response = await axios.get("/teachers/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchApplicants = async () => {
  try {
    const response = await axios.get("/applicants/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchCourses = async () => {
  try {
    const response = await axios.get("/courses/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchEnrollments = async () => {
  try {
    const response = await axios.get("/enrollments/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createApplicant = async (formData) => {
  try {
    const response = await axios.post("/applicants/", formData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
