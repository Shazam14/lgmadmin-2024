/* 



// src/services/api.js
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // Hard-coded base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    console.log("Retrieved Token:", token); // Debug log to check token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No token found in cookies");
    }
    console.log("Config with Auth:", config); // Log config with headers
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api; */

/* import axios from "axios";
import Cookies from "js-cookie";

export const fetchStudents = async () => {
  console.log(`${process.env.REACT_APP_API_BASE_URL}`, "checking the URL");

  const token = Cookies.get("access_token");

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/students/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data;
    console.log("api js gives:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch students:", error);
    throw error;
  }
};

export const fetchStudentByStudentId = async (studentId) => {
  console.log("fetchStudentByStudentId", studentId);
  console.log(
    "url works",
    `${process.env.REACT_APP_API_BASE_URL}/students/${studentId}/`
  );

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/students/${studentId}/`
    );
    console.log("RESPONSE", response);
    if (!response.ok) {
      // If the response is not okay, parse the JSON to get error details
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.detail || "Failed to fetch student");
    }

    const data = await response.json();
    console.log("API.js Data:", data);
    return data;
  } catch (error) {
    // Log any errors during the fetch or processing
    console.error("Error fetching student details:", error);
    throw error; // Rethrow to handle it where the function is called
  }
};
export const fetchParentDetails = async (parentUrl) => {
  try {
    const response = await fetch(parentUrl);
    console.log("Parent Details Response:", response);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.detail || "Failed to fetch parent details");
    }
    const data = await response.json();
    console.log("Parent Details Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching parent details:", error);
    throw error;
  }
};

export const updateStudent = async (studentId, updatedData) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/students/${studentId}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }
  );
  const data = await response.json();
  console.log("API RESPONSE", data);
  if (!response.ok) {
    throw new Error("Failed to update student");
  }
  return data;
};

//Teaachers API
export const fetchTeachers = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/teachers/`
  );
  const data = await response.json();
  console.log("API RESPONSE", data);
  if (!response.ok) {
    console.log("line 21");
    throw new Error("Failed to fetch teachers");
  }
  return data;
};

export const fetchApplicants = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/applicants/`
  );
  const data = await response.json();
  console.log("API RESPONSE", data);
  if (!response.ok) {
    throw new Error("Failed to fetch applicants");
  }
  return data;
};

export const fetchCourses = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/courses/`
  );
  const data = await response.json();
  console.log("API RESPONSE", data);
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return data;
};

export const fetchEnrollments = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/enrollments/`
  );
  const data = await response.json();
  console.log("API RESPONSE", data);
  if (!response.ok) {
    throw new Error("Failed to fetch enrollments");
  }
  return data;
};

//applicants
export const createApplicant = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/applicants/`,
      formData
    );
    console.log("API RESPONSE", response.data);
    if (!response.ok) {
      throw new Error("Failed to create applicant");
    }
    return response.data;
  } catch (error) {
    console.error("Error creating applicant:", error);
    throw error;
  }
};
 */
