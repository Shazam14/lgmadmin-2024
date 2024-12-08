// src/hooks/useStudentData.js
import { useState, useEffect, useCallback, useRef } from "react";
import { usePortalAuth } from "../contexts/PortalAuthContext";
import apiClientUpdate from "../services/apiClientUpdate";
import Cookies from "js-cookie";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const useStudentData = () => {
  const abortControllerRef = useRef(null);
  const { isStudent, portalUser } = usePortalAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentInfo, setStudentInfo] = useState({
    personal: {
      first_name: "",
      middle_name: "",
      last_name: "",
      gender: "",
      age: 0,
      birthday: "",
      email: "",
      student_id: "",
      student_status: "",
      grade: "",
      section: "",
    },
    academic: {
      program: {
        id: null,
        name: "",
        description: "",
        age_range: "",
      },
      promoted: false,
      elementary_certificate: false,
      junior_high_certificate: false,
      attendance_percentage: 0,
      grades: [
        {
          subject: {
            id: null,
            name: "", // From your shell example: Mathematics, Science, etc.
            description: "",
          },
          written_work: 0,
          performance_task: 0,
          quarterly_exam: 0,
          quarterly_grade: 0,
          final_grade: 0.0, // Matches your shell output showing 0.0
          evaluation_code: "",
          remedial_passed: false,
          cle_mve_grade: 0,
        },
      ],
    },
    enrollment: {
      grade_level: "",
      enrollment_date: "",
      academic_year: "",
      academic_period: "",
      enrollment_status: "",
      previous_school: "",
      previous_school_address: "",
      previous_school_phone: "",
      special_needs: "",
      allergies: "",
      medications: "",
    },
    tuition: {
      tuition_status: "",
      tuition_notes: "",
      account_status: "",
    },
  });

  const fetchStudentDetails = useCallback(async () => {
    const accessToken = Cookies.get("portal_access_token");

    if (!accessToken) {
      console.log("No access token found");
      setError("Authentication required");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const fetchOptions = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const [profileRes, academicRes, enrollmentRes] = await Promise.all([
        apiClientUpdate
          .get("portal/student/profile/", fetchOptions)
          .catch((err) => {
            console.error("Profile fetch error:", err);
            return { data: { personal: {} } };
          }),
        apiClientUpdate
          .get("portal/student/details/", fetchOptions)
          .catch((err) => {
            console.error("Academic fetch error:", err);
            return { data: { grades: [] } };
          }),
        apiClientUpdate
          .get("portal/student/enrollment/", fetchOptions)
          .catch((err) => {
            console.error("Enrollment fetch error:", err);
            return { data: {} };
          }),
      ]);

      console.log(
        "Fetched student details:",
        profileRes.data,
        academicRes.data,
        enrollmentRes.data
      );

      // Use a functional update to avoid dependency on studentInfo
      setStudentInfo((prevState) => {
        const transformedGrades =
          academicRes.data?.grades?.map((grade) => ({
            subject: {
              id: grade.subject.id,
              name: grade.subject.name,
              description: grade.subject.description || "",
            },
            written_work: grade.written_work || 0,
            performance_task: grade.performance_task || 0,
            quarterly_exam: grade.quarterly_exam || 0,
            quarterly_grade: grade.quarterly_grade || 0,
            final_grade: grade.final_grade || 0.0,
            evaluation_code: grade.evaluation_code || "P",
            remedial_passed: grade.remedial_passed || false,
            cle_mve_grade: grade.cle_mve_grade || 0,
          })) || [];

        console.log("Transformed grades:", transformedGrades);

        return {
          ...prevState,
          personal: profileRes.data?.personal || prevState.personal,
          academic: {
            ...academicRes.data,
            grades: transformedGrades,
          },
          enrollment: enrollmentRes.data || prevState.enrollment,
        };
      });
    } catch (err) {
      if (err.response?.status === 401) {
        console.error("Authentication error - redirecting to login");
        Cookies.remove("portal_access_token");
        window.location.href = "/portal-login";
        return;
      }

      console.error("Error fetching student data:", err);
      setError(
        err.response?.data?.error ||
          err.message ||
          "Failed to load student data"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Add token monitoring effect
  useEffect(() => {
    const checkToken = () => {
      const token = Cookies.get("portal_access_token");
      if (!token && isStudent) {
        console.log("Token missing - redirecting to login");
        window.location.href = "/portal-login";
      }
    };

    const tokenCheck = setInterval(checkToken, 5000); // Check every 5 seconds

    return () => {
      clearInterval(tokenCheck);
    };
  }, [isStudent]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, []);

  // Add data validation helpers
  const validatePersonalData = (data) => {
    if (!data) return {};
    return {
      first_name: data.first_name || "",
      middle_name: data.middle_name || "",
      last_name: data.last_name || "",
      gender: data.gender || "",
      age: parseInt(data.age) || 0,
      birthday: data.birthday || "",
      email: data.email || "",
      student_id: data.student_id || "",
      student_status: data.student_status || "",
      grade: data.grade || "",
      section: data.section || "",
    };
  };

  const validateAcademicData = (data) => {
    if (!data) return {};
    return {
      program: data.program || null,
      promoted: Boolean(data.promoted),
      elementary_certificate: Boolean(data.elementary_certificate),
      junior_high_certificate: Boolean(data.junior_high_certificate),
      attendance_percentage: parseFloat(data.attendance_percentage) || 0,
      grades: Array.isArray(data.grades) ? data.grades : [],
    };
  };

  const validateEnrollmentData = (data) => {
    if (!data) return {};
    return {
      grade_level: data.grade_level || "",
      enrollment_date: data.enrollment_date || "",
      academic_year: data.academic_year || "",
      academic_period: data.academic_period || "",
      enrollment_status: data.enrollment_status || "",
      previous_school: data.previous_school || "",
      previous_school_address: data.previous_school_address || "",
      previous_school_phone: data.previous_school_phone || "",
      special_needs: data.special_needs || "",
      allergies: data.allergies || "",
      medications: data.medications || "",
    };
  };

  // Update student information with better error handling
  const updateStudentInfo = async (section, data) => {
    if (!isStudent || !portalUser) {
      throw new Error("Not authenticated as student");
    }

    try {
      setLoading(true);
      const response = await apiClientUpdate.patch(
        `portal/student/${section}/`,
        data
      );

      // Verify successful update
      if (response.status === 200) {
        await fetchStudentDetails(); // Refresh data
        return response.data;
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message;
      setError(`Error updating student information: ${errorMessage}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Your existing helper functions
  const calculateAcademicStatus = useCallback(() => {
    const grades = studentInfo.academic.grades;
    if (!grades?.length) return "No grades available";

    const failingGrades = grades.filter(
      (grade) => grade.final_grade < 75
    ).length;

    if (failingGrades === 0) return "Passing";
    if (failingGrades <= 2) return "For Remedial";
    return "For Review";
  }, [studentInfo.academic.grades]);

  const getStudentStats = useCallback(
    () => ({
      attendance: {
        value: studentInfo.academic.attendance_percentage,
        label: "Attendance Rate",
      },
      academicStatus: {
        value: calculateAcademicStatus(),
        label: "Academic Status",
      },
      enrollmentStatus: {
        value: studentInfo.enrollment.enrollment_status,
        label: "Enrollment Status",
      },
      tuitionStatus: {
        value:
          studentInfo.tuition.tuition_status === "FP"
            ? "Fully Paid"
            : "Unsettled",
        label: "Tuition Status",
      },
    }),
    [studentInfo, calculateAcademicStatus]
  );

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Fetch data when auth state changes
  useEffect(() => {
    if (isStudent && portalUser) {
      fetchStudentDetails();
    }
  }, [isStudent, portalUser, fetchStudentDetails]);

  return {
    studentInfo,
    loading,
    error,
    stats: getStudentStats(),
    updateStudentInfo,
    refetchData: fetchStudentDetails,
    sAuthenticated: Boolean(Cookies.get("portal_access_token")),
  };
};
