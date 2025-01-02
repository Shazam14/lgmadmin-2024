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
      if (type === "students") {
        console.log("Students API raw response:", {
          status: response.status,
          data: response.data,
          url: url,
        });
      }

      console.log(`Response for ${type}:`, response.data); // Debug log
      setError(null);
      switch (type) {
        case "dashboard":
          setStats(response.data);
          break;
        case "applicants":
          if (Array.isArray(response.data.results)) {
            setApplicants(response.data.results);
            return response.data; // Return the response data
          }
          break;
        case "enrollments":
          if (Array.isArray(response.data.results)) {
            console.log(
              "Setting enrollments state with:",
              response.data.results
            );
            setEnrollments(response.data.results);
          } else {
            console.error("Invalid enrollments data format:", response.data);
          }
          break;
        case "programs":
          setPrograms(response.data);
          break;
        case "students":
          if (response.data?.results) {
            console.log(
              "Setting students from results:",
              response.data.results
            );
            setStudents(response.data.results);
          } else if (Array.isArray(response.data)) {
            console.log("Setting students from array:", response.data);
            setStudents(response.data);
          } else {
            console.error("Unexpected students data format:", response.data);
            setStudents([]);
          }
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

  // In useAdminData.js, add this console log right after the API call
  const fetchApplicants = useCallback(async () => {
    console.log("Fetching applicants...");
    try {
      const data = await fetchData(
        "applicants",
        `portal/admin/applicants/?${new URLSearchParams(filters).toString()}`
      );
      console.log("FULL Applicants API Response:", data);
      return data;
    } catch (error) {
      console.error("Error in fetchApplicants:", error);
      return { results: [] }; // Return empty results on error
    }
  }, [fetchData, filters]);

  const fetchEnrollments = useCallback(
    () =>
      fetchData(
        "enrollments",
        `portal/admin/enrollments/?${new URLSearchParams(filters).toString()}`
      ),
    [fetchData, filters]
  );

  // In useAdminData.js

  const fetchGrades = useCallback(
    async ({ grade_level, section, subject_id }) => {
      try {
        setLoading(true);
        console.log("Starting fetchGrades with params:", {
          grade_level,
          section,
          subject_id,
          studentsCount: students?.length,
          sampleStudents: students?.slice(0, 2),
        });

        const response = await apiClientUpdate.get(
          "portal/admin/student_grades/",
          {
            params: {
              grade_level,
              section,
              subject_id,
            },
          }
        );

        console.log("RAW Grades API Response Data:", {
          raw: response.data,
          isArray: Array.isArray(response.data),
          count: response.data?.length || 0,
        });

        // Filter students for the selected class/section
        const classStudents = students.filter(
          (student) =>
            student.grade === grade_level &&
            (!section || student.section === section)
        );

        console.log("Filtered class students:", {
          total: classStudents.length,
          students: classStudents,
        });

        // Create base grades
        const gradesByStudent = classStudents.map((student) => {
          const baseGrade = {
            student_id: student.student_id,
            name: `${student.first_name} ${student.last_name}`,
            written_work: "-",
            performance_task: "-",
            quarterly_exam: "-",
            final_grade: "Not yet computed",
          };

          console.log("Created base grade for student:", {
            studentId: student.student_id,
            baseGrade,
          });
          return baseGrade;
        });

        // Merge with actual grades
        const mergedGrades = gradesByStudent.map((baseGrade) => {
          // Look for matching grade using student name since IDs might be different
          const studentGrade = response.data.find((g) => {
            const studentFullName = `${g.student__first_name} ${g.student__last_name}`;
            const baseFullName = baseGrade.name;
            const matches = studentFullName === baseFullName;

            console.log("Grade matching attempt:", {
              baseStudentName: baseFullName,
              gradeStudentName: studentFullName,
              matches,
            });

            return matches;
          });

          if (studentGrade) {
            console.log("Found matching grade for student:", {
              studentName: baseGrade.name,
              grade: studentGrade,
            });

            return {
              ...baseGrade,
              written_work: studentGrade.written_work?.toString() || "-",
              performance_task:
                studentGrade.performance_task?.toString() || "-",
              quarterly_exam: studentGrade.quarterly_exam?.toString() || "-",
              final_grade:
                studentGrade.final_grade?.toString() || "Not yet computed",
            };
          }

          console.log("No matching grade found for student:", baseGrade.name);
          return baseGrade;
        });

        console.log("Final merged grades result:", {
          count: mergedGrades.length,
          grades: mergedGrades,
        });

        return mergedGrades;
      } catch (err) {
        console.error("Error in fetchGrades:", {
          error: err,
          message: err.message,
          response: err.response?.data,
        });
        setError("Failed to fetch grades");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [students]
  );

  const fetchPrograms = useCallback(async () => {
    try {
      const token = getAuthToken();
      console.log("Fetching programs data");

      const response = await apiClientUpdate({
        method: "get",
        url: "portal/admin/programs/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Programs API response:", response.data);

      if (response.data?.results) {
        setPrograms(response.data.results);
      } else if (Array.isArray(response.data)) {
        setPrograms(response.data);
      }
    } catch (err) {
      console.error("Error fetching programs:", err);
      setPrograms([]);
    }
  }, []);

  const fetchStudents = useCallback(() => {
    console.log("Fetching students - start", {
      filters,
      url: `portal/admin/students/?${new URLSearchParams(filters).toString()}`,
    });

    return fetchData(
      "students",
      `portal/admin/students/?${new URLSearchParams(filters).toString()}`
    )
      .then((response) => {
        console.log("Students fetch successful:", response);
        return response;
      })
      .catch((error) => {
        console.error("Students fetch failed:", error);
        throw error;
      });
  }, [fetchData, filters]);

  const handleUpdateStudent = async (studentId, action) => {
    try {
      setLoading(true);

      switch (action.action) {
        case "status":
          await apiClientUpdate.patch(`portal/admin/students/${studentId}/`, {
            account_status: action.data.status,
          });
          break;

        case "promote":
          await apiClientUpdate.post(
            `portal/admin/students/${studentId}/promote/`
          );
          break;

        case "view":
          // Handle view action - maybe fetch detailed student data
          break;
      }

      // Refresh students data after update
      await fetchStudents();
      setError(null);
    } catch (err) {
      setError("Failed to update student: " + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

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

  const handleBulkUpdateGrades = useCallback(
    async (gradesData) => {
      try {
        setLoading(true);
        await apiClientUpdate.patch("portal/admin/bulk_update_grades/", {
          grades: gradesData.map((grade) => ({
            student_id: grade.student_id,
            subject_id: grade.subject_id,
            written_work: grade.written_work,
            performance_task: grade.performance_task,
            quarterly_exam: grade.quarterly_exam,
          })),
        });

        // Refresh grades after update
        await fetchGrades(filters);
      } catch (err) {
        console.error("Error updating grades:", err);
        setError("Failed to update grades");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [filters, fetchGrades]
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!Cookies.get("access_token")) {
        console.log("Token missing - redirecting to login");
        window.location.href = "/admin-login";
        return;
      }
      console.log("Fetching data with filters:", filters);
      try {
        const results = await Promise.all([
          fetchDashboardStats(),
          fetchApplicants(),
          fetchEnrollments(),
          fetchPrograms(),
          fetchStudents(),
        ]);

        // Destructure results properly
        const [dashboard, applicants, enrollments, programs, students] =
          results;

        console.log("Initial data fetch complete:", {
          dashboard,
          applicants,
          enrollments,
          programs,
          students,
        });
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, [
    fetchDashboardStats,
    fetchApplicants,
    fetchEnrollments,
    fetchPrograms,
    fetchStudents,
    filters,
  ]);

  useEffect(() => {
    console.log("Applicants state changed:", {
      length: applicants?.length || 0,
      data: applicants,
      isEmpty: !applicants || applicants.length === 0,
    });
  }, [applicants]);

  useEffect(() => {
    console.log("Enrollments state changed:", {
      length: enrollments?.length,
      data: enrollments,
    });
  }, [enrollments]);

  //use Effect for students
  useEffect(() => {
    console.log("Students state changed:", {
      length: students?.length || 0,
      data: students,
      isEmpty: !students || students.length === 0,
    });
  }, [students]);

  return {
    stats,
    applicants: applicants || [], // Ensure we always return an array
    enrollments: enrollments || [],
    students: students || [],
    programs: programs || [],
    loading,
    error,
    filters,
    setFilters,
    handleEnrollStudent,
    handleBulkEnroll,
    handleUpdateStudent,
    fetchGrades,
    refreshData: async () => {
      console.log("Starting data refresh...");
      await Promise.all([
        fetchDashboardStats(),
        fetchApplicants(),
        fetchEnrollments(),
        fetchPrograms(),
        fetchStudents(),
        handleBulkUpdateGrades(),
        //handleUpdateGrade(),
      ]);
      console.log("Data refresh complete");
    },
    isAuthenticated: Boolean(Cookies.get("access_token")),
  };
};
