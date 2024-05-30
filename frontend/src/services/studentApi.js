// studentApi.js
import apiClient from "./apiClient";
import { handleApiError } from "./apiUtils";

export const fetchStudents = async () => {
  try {
    const response = await apiClient.get("/students/");
    console.log("printing response from student api", response.data);
    return response.data;
  } catch (error) {
    console.error("printing error on line 11 studentAPI");
    handleApiError(error);
  }
};

export const fetchStudentByStudentId = async (studentId) => {
  try {
    const response = await apiClient.get(`/students/${studentId}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchParentDetails = async (parentUrl) => {
  try {
    const response = await apiClient.get(parentUrl);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateStudent = async (studentId, updatedData) => {
  try {
    const response = await apiClient.put(
      `/students/${studentId}/`,
      updatedData
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchTeachers = async () => {
  try {
    const response = await apiClient.get("/teachers/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchApplicants = async () => {
  try {
    const response = await apiClient.get("/applicants/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchCourses = async () => {
  try {
    const response = await apiClient.get("/courses/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchEnrollments = async () => {
  try {
    const response = await apiClient.get("/enrollments/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createApplicant = async (formData) => {
  try {
    const response = await apiClient.post("/applicants/", formData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
