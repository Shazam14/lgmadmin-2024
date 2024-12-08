import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import apiClientUpdate from "../services/apiClientUpdate";
import { usePortalAuth } from "../contexts/PortalAuthContext";
import Cookies from "js-cookie";

export const useAdminData = () => {
  const navigate = useNavigate();
  const { isAdmin, isAuthenticated } = usePortalAuth();
  const abortControllerRef = useRef(null);

  const [data, setData] = useState({
    students: [],
    stats: {},
    applicants: [],
    enrollments: [],
    programs: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    grade: "all",
    program: "all",
    section: "all",
  });

  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Token validation
  const checkAuth = useCallback(() => {
    const token = Cookies.get("portal_access_token");
    const refreshToken = Cookies.get("portal_refresh_token");

    if (!token && !refreshToken) {
      console.log("No tokens found");
      return false;
    }

    try {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const isExpired = tokenData.exp * 1000 < Date.now();

      if (isExpired) {
        console.log("Token expired");
        return false;
      }

      return true;
    } catch (e) {
      console.error("Token validation error:", e);
      return false;
    }
  }, []);

  // Data fetching function
  const fetchData = useCallback(
    async (type, url) => {
      try {
        if (!checkAuth()) {
          console.log("Authentication check failed");
          navigate("/portal-login");
          return;
        }

        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        console.log(`Fetching ${type} from ${url}`);

        const response = await apiClientUpdate({
          method: "get",
          url,
          signal: abortControllerRef.current.signal,
          headers: {
            Authorization: `Bearer ${Cookies.get("portal_access_token")}`,
          },
        });

        console.log(`${type} response:`, response.data);

        setData((prev) => ({
          ...prev,
          [type]: response.data,
        }));

        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request aborted");
          return;
        }

        console.error(`Error details for ${type}:`, {
          message: err.message,
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
        });

        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
          navigate("/portal-login");
          return;
        }

        setError(`Failed to fetch ${type}: ${err.message}`);
      }
    },
    [navigate, checkAuth]
  );

  // Authentication validation effect
  useEffect(() => {
    const validateAuth = async () => {
      console.log("Validating auth - Current status:", {
        isAdmin,
        isAuthenticated: isAuthenticated(),
      });

      try {
        // First check if authenticated
        if (!isAuthenticated()) {
          throw new Error("Not authenticated");
        }

        // Then check admin status
        if (!isAdmin) {
          throw new Error("Not authorized as admin");
        }

        // Verify token with backend
        const response = await apiClientUpdate.get("/auth/verify/");

        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        console.error("Auth validation error:", err);
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          error: err.message,
        });
        navigate("/portal-login");
      }
    };

    validateAuth();
  }, [isAdmin, isAuthenticated, navigate]);

  // Data fetching effect
  useEffect(() => {
    if (!authState.isAuthenticated) return;

    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchData("stats", "/portal/admin/dashboard_stats/"),
          fetchData(
            "applicants",
            `/portal/admin/applicants/?${new URLSearchParams(filters).toString()}`
          ),
          fetchData(
            "enrollments",
            `/portal/admin/enrollments/?${new URLSearchParams(filters).toString()}`
          ),
          fetchData("programs", "/portal/admin/programs/"),
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [authState.isAuthenticated, fetchData, filters]);

  // Enhanced data refresh function
  const refreshData = useCallback(async () => {
    if (!authState.isAuthenticated) {
      console.log("Not authenticated, skipping refresh");
      return;
    }

    setLoading(true);
    try {
      await Promise.all([
        fetchData("stats", "/portal/admin/dashboard_stats/"),
        fetchData(
          "applicants",
          `/portal/admin/applicants/?${new URLSearchParams(filters).toString()}`
        ),
        fetchData(
          "enrollments",
          `/portal/admin/enrollments/?${new URLSearchParams(filters).toString()}`
        ),
        fetchData("programs", "/portal/admin/programs/"),
      ]);
    } finally {
      setLoading(false);
    }
  }, [authState.isAuthenticated, fetchData, filters]);

  return {
    ...data,
    loading: loading || authState.isLoading,
    error: error || authState.error,
    filters,
    setFilters,
    refreshData,
    isAuthenticated: authState.isAuthenticated,
  };
};
