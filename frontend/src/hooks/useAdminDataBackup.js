import { useState, useEffect, useCallback, useRef } from "react";
import apiClientUpdate from "../services/apiClientUpdate";
import Cookies from "js-cookie";

export const useAdminData = () => {
  const abortControllerRef = useRef(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});
  const [applicants, setApplicants] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [filters, setFilters] = useState({
    status: "all",
    grade: "all",
    program: "all",
    section: "all",
  });

  const getAuthToken = () => {
    // Check for admin token first, then portal token as fallback
    return Cookies.get("access_token") || Cookies.get("portal_access_token");
  };

  const fetchData = useCallback(async (type, url) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      console.log(`Token for ${url}:`, token); // Debug log
      const response = await apiClientUpdate({
        method: "get",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (type === "applicants") {
        console.log("Raw applicants data:", response.data);
      }
      if (type === "enrollments") {
        console.log("Raw enrollments data:", response.data);
      }

      console.log(`Response for ${type}:`, response.data); // Debug log
      setError(null);
      switch (type) {
        case "dashboard":
          setStats(response.data);
          break;
        case "applicants":
          console.log(
            "About to set applicants state with:",
            response.data.results
          );
          setApplicants(response.data.results || []);
          console.log("Applicants state after setting:", applicants);
          break;
        case "enrollments":
          setEnrollments(response.data.results || []);
          break;
        case "programs":
          setPrograms(response.data);
          break;
        case "students":
          setStudents(response.data.results || []);
          break;
        default:
          console.error(`Unknown type: ${type}`);
      }
    } catch (err) {
      setError(`Failed to fetch ${type}`);
      console.error(`Error fetching ${type}:`, err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDashboardStats = useCallback(
    () => fetchData("dashboard", "portal/admin/dashboard_stats/"),
    [fetchData]
  );

  const fetchApplicants = useCallback(
    () =>
      fetchData(
        "applicants",
        `portal/admin/applicants/?${new URLSearchParams(filters).toString()}`
      ),
    [fetchData, filters]
  );

  const fetchEnrollments = useCallback(
    () =>
      fetchData(
        "enrollments",
        `portal/admin/enrollments/?${new URLSearchParams(filters).toString()}`
      ),
    [fetchData, filters]
  );

  const fetchPrograms = useCallback(
    () => fetchData("programs", "portal/admin/programs/"),
    [fetchData]
  );

  const fetchStudents = useCallback(
    () =>
      fetchData(
        "students",
        `portal/admin/students/?${new URLSearchParams(filters).toString()}`
      ),
    [fetchData, filters]
  );

  const handleEnrollment = async (enrollmentData) => {
    try {
      setLoading(true);
      const response = await apiClientUpdate.post(
        "portal/admin/enrollments/",
        enrollmentData
      );

      // Refresh all related data after successful enrollment
      await Promise.all([
        fetchApplicants(),
        fetchEnrollments(),
        fetchDashboardStats(),
        fetchStudents(),
      ]);

      return response.data;
    } catch (error) {
      console.error("Enrollment failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Add a utility function to check enrollment eligibility
  const checkEnrollmentEligibility = (applicant) => {
    if (!applicant) return false;

    // Check if applicant is approved and not already enrolled
    return (
      applicant.status === "Approved" &&
      !enrollments.some(
        (enr) =>
          enr.student_id === applicant.id || enr.applicant_id === applicant.id
      )
    );
  };

  //enrollment parts
  const handleEnrollStudent = useCallback(
    async (studentId, enrollmentData) => {
      try {
        setLoading(true);
        const response = await apiClientUpdate.post(
          `portal/admin/enroll_student/${studentId}/`,
          enrollmentData
        );
        await fetchEnrollments(); // Refresh enrollments data
        return response.data;
      } catch (err) {
        setError("Failed to enroll student");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchEnrollments]
  );

  const handleBulkEnroll = useCallback(
    async (studentIds, enrollmentData) => {
      try {
        setLoading(true);
        const response = await apiClientUpdate.post(
          "portal/admin/bulk_enroll_students/",
          {
            student_ids: studentIds,
            ...enrollmentData,
          }
        );
        await fetchEnrollments(); // Refresh enrollments data
        return response.data;
      } catch (err) {
        setError("Failed to process bulk enrollment");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchEnrollments]
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!Cookies.get("access_token")) {
        console.log("Token missing - redirecting to login");
        window.location.href = "/admin-login";
        return;
      }
      await Promise.all([
        fetchDashboardStats(),
        fetchApplicants(),
        fetchEnrollments(),
        fetchPrograms(),
        fetchStudents(),
      ]);
    };
    fetchInitialData();
  }, [
    fetchDashboardStats,
    fetchApplicants,
    fetchEnrollments,
    fetchPrograms,
    fetchStudents,
  ]);

  useEffect(() => {
    const fetchFilteredData = async () => {
      if (!Cookies.get("access_token")) {
        console.log("Token missing - redirecting to login");
        window.location.href = "/admin-login";
        return;
      }
      await Promise.all([fetchApplicants(), fetchEnrollments()]);
    };
    fetchFilteredData();
  }, [filters, fetchApplicants, fetchEnrollments]);

  return {
    stats,
    applicants,
    enrollments,
    students,
    programs,
    loading,
    error,
    filters,
    setFilters,
    handleEnrollStudent,
    handleBulkEnroll,
    refreshData: async () => {
      await fetchDashboardStats();
      await fetchApplicants();
      await fetchEnrollments();
      await fetchPrograms();
    },
    sAuthenticated: Boolean(Cookies.get("access_token")),
  };
};
