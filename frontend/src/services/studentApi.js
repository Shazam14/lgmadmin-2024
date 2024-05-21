// studentApi.js
import api from "./api";
import { handleApiError } from "./apiUtils";

export const fetchStudents = async () => {
  try {
    const response = await api.get("/students/");
    console.log("printing response from student api", response.data);
    return response.data;
  } catch (error) {
    console.error("printing error on line 11 studentAPI");
    handleApiError(error);
  }
};

export const fetchStudentByStudentId = async (studentId) => {
  try {
    const response = await api.get(`/students/${studentId}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchParentDetails = async (parentUrl) => {
  try {
    const response = await api.get(parentUrl);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateStudent = async (studentId, updatedData) => {
  try {
    const response = await api.put(`/students/${studentId}/`, updatedData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchTeachers = async () => {
  try {
    const response = await api.get("/teachers/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchApplicants = async () => {
  try {
    const response = await api.get("/applicants/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchCourses = async () => {
  try {
    const response = await api.get("/courses/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchEnrollments = async () => {
  try {
    const response = await api.get("/enrollments/");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createApplicant = async (formData) => {
  try {
    const response = await api.post("/applicants/", formData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
