// src/services/api.js
import apiClientUpdate from "./apiClientUpdate";

const api = {
  // Portal specific endpoints that align with your FamilyPortalDemo needs
  portal: {
    // Get children list for parent
    getChildren: () => apiClientUpdate.get("portal/parent/children/"),

    // Get complete student details
    getStudentDetails: (studentId) =>
      apiClientUpdate.get(`portal/student_details/${studentId}/`),

    // Update student information
    updateStudent: (studentId, section, data) =>
      apiClientUpdate.patch(`portal/update_student/${studentId}/`, {
        section,
        ...data,
      }),

    // Get academic info
    getGrades: (studentId) =>
      apiClientUpdate.get(`portal/student/${studentId}/grades/`),

    getAttendance: (studentId) =>
      apiClientUpdate.get(`portal/student/${studentId}/attendance/`),

    // Get medical history
    getMedical: (studentId) =>
      apiClientUpdate.get(`portal/student/${studentId}/medical/`),

    // Get family info
    getFamily: (studentId) =>
      apiClientUpdate.get(`portal/student/${studentId}/family/`),
  },
};

export default api;
