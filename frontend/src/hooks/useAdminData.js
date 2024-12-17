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
      console.log(`Response for ${type}:`, response.data); // Debug log
      setError(null);
      switch (type) {
        case "dashboard":
          setStats(response.data);
          break;
        case "applicants":
          setApplicants(response.data);
          break;
        case "enrollments":
          setEnrollments(response.data);
          break;
        case "programs":
          setPrograms(response.data);
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
      ]);
    };
    fetchInitialData();
  }, [fetchDashboardStats, fetchApplicants, fetchEnrollments, fetchPrograms]);

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
    refreshData: async () => {
      await fetchDashboardStats();
      await fetchApplicants();
      await fetchEnrollments();
      await fetchPrograms();
    },
    sAuthenticated: Boolean(Cookies.get("access_token")),
  };
};
