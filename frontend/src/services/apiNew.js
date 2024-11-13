import apiClientUpdate from "./apiClientUpdate";

const apiNew = {
  // Universal admin endpoints
  admin: {
    // Students management
    students: {
      getAll: () => apiNew.get("students/"),
      getById: (id) => apiNew.get(`students/${id}/`),
      create: (data) => apiNew.post("students/", data),
      update: (id, data) => apiNew.patch(`students/${id}/`, data),
      delete: (id) => apiNew.delete(`students/${id}/`),
      uploadBulk: (file) => apiNew.uploadFile("students/upload/", file),
    },

    // Parents management
    parents: {
      getAll: () => apiNew.get("parents/"),
      getById: (id) => apiNew.get(`parents/${id}/`),
      create: (data) => apiNew.post("parents/", data),
      update: (id, data) => apiNew.patch(`parents/${id}/`, data),
      delete: (id) => apiNew.delete(`parents/${id}/`),
    },

    // Applications management
    applications: {
      getAll: () => apiNew.get("applicants/"),
      getById: (id) => apiNew.get(`applicants/${id}/`),
      approve: (id) => apiNew.post(`applicants/${id}/approve/`),
      reject: (id) => apiNew.post(`applicants/${id}/reject/`),
    },

    // Grades management
    grades: {
      getAll: () => apiNew.get("grades/"),
      getByStudent: (studentId) => apiNew.get(`grades/student/${studentId}/`),
      update: (id, data) => apiNew.patch(`grades/${id}/`, data),
    },
  },

  // Portal specific endpoints
  portal: {
    // Authentication
    auth: {
      login: (credentials) => apiNew.post("portal/login/", credentials),
      logout: () => apiNew.post("portal/logout/"),
      refreshToken: (token) =>
        apiNew.post("portal/token/refresh/", { refresh: token }),
    },

    // Parent portal
    parent: {
      getProfile: () => apiNew.get("portal/parent/profile/"),
      updateProfile: (data) => apiNew.patch("portal/parent/profile/", data),
      getChildren: () => apiNew.get("portal/parent/children/"),
      getChildGrades: (childId) =>
        apiNew.get(`portal/parent/children/${childId}/grades/`),
      getChildAttendance: (childId) =>
        apiNew.get(`portal/parent/children/${childId}/attendance/`),
    },

    // Student portal
    student: {
      getProfile: () => apiNew.get("portal/student/profile/"),
      updateProfile: (data) => apiNew.patch("portal/student/profile/", data),
      getGrades: () => apiNew.get("portal/student/grades/"),
      getAttendance: () => apiNew.get("portal/student/attendance/"),
      getLessons: () => apiNew.get("portal/student/lessons/"),
    },
  },

  // Generic request methods
  request: async (method, endpoint, data = null, options = {}) => {
    try {
      const config = {
        method,
        url: endpoint,
        ...options,
      };

      if (data) {
        config.data = data;
      }

      const response = await apiClientUpdate(config);
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("API Error:", {
          endpoint,
          method,
          error: error.response?.data || error.message,
        });
      }
      throw error;
    }
  },

  get: (endpoint, options = {}) =>
    apiNew.request("GET", endpoint, null, options),
  post: (endpoint, data, options = {}) =>
    apiNew.request("POST", endpoint, data, options),
  put: (endpoint, data, options = {}) =>
    apiNew.request("PUT", endpoint, data, options),
  patch: (endpoint, data, options = {}) =>
    apiNew.request("PATCH", endpoint, data, options),
  delete: (endpoint, options = {}) =>
    apiNew.request("DELETE", endpoint, null, options),

  // Utility methods
  uploadFile: async (endpoint, file, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);

    return apiNew.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
  },
};

export default apiNew;
