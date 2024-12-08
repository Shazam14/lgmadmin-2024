// src/hooks/usePortalData.js
import { useState, useEffect, useCallback, useRef } from "react";
import { usePortalAuth } from "../contexts/PortalAuthContext";
import apiClientUpdate from "../services/apiClientUpdate";
import Cookies, { set } from "js-cookie";

export const usePortalData = () => {
  const { isAuthenticated } = usePortalAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [studentInfo, setStudentInfo] = useState({
    personal: {
      firstName: "",
      middleName: "",
      lastName: "",
      birthday: "",
      gender: "",
      bloodType: "",
      nationality: "",
      studentId: "",
    },
    characteristics: {
      height: "",
      weight: "",
      eyeColor: "",
      hairColor: "",
      distinguishingMarks: "",
      temperament: "",
      interests: "",
      strengths: "",
      challenges: "",
      selectedTraits: [],
      customFields: {},
    },
    medical: {
      bloodType: "",
      allergies: "",
      currentMedications: "",
      medicalConditions: "",
      emergencyContact: "",
      lastCheckupDate: "",
      doctorName: "",
      doctorContact: "",
    },
    father: {
      firstName: "",
      middleName: "",
      lastName: "",
      occupation: "",
      employer: "",
      workAddress: "",
      phoneNumber: "",
      email: "",
    },
    mother: {
      firstName: "",
      middleName: "",
      lastName: "",
      occupation: "",
      employer: "",
      workAddress: "",
      phoneNumber: "",
      email: "",
    },
    living: {
      currentArrangement: "",
      address: "",
      city: "",
      postalCode: "",
      transportationMethod: "",
      busRoute: "",
      pickupTime: "",
      dropoffTime: "",
      guardianName: "",
      guardianRelationship: "",
      guardianContact: "",
      specialInstructions: "",
    },
    grades: {
      currentQuarter: "",
      subjects: [],
    },
    tuition: {
      currentBalance: 0,
      totalFees: 0,
      payments: [],
      nextDueDate: "",
      nextDueAmount: 0,
    },
    documents: {
      reportCards: [],
      certificates: [],
      medicalRecords: [],
    },
  });

  // Fetch children data
  const fetchChildren = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const response = await apiClientUpdate.get("/portal/children/");
      if (process.env.NODE_ENV === "testing") {
        console.log("Children response:", response.data);
      }
      setChildren(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching children:", err);
      setError(
        err.response?.status === 401 ? "Please login again" : err.message
      );
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      fetchChildren().finally(() => setLoading(false));
    }
  }, [isAuthenticated, fetchChildren]);

  // Fetch student details
  const fetchStudentDetails = useCallback(
    async (studentId) => {
      if (!studentId || !isAuthenticated) {
        console.warn("No student ID provided");
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Debug request setup
        const token = Cookies.get("portal_access_token");
        console.log({
          requestInfo: {
            studentId,
            hasToken: !!token,
            tokenValue: token ? `${token.substring(0, 10)}...` : "none",
            endpoint: `/portal/student/${studentId}/details/`,
          },
        });

        const response = await apiClientUpdate.get(
          `portal/student/${studentId}/details/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Validate response data
        if (!response.data) {
          throw new Error("No data received from server");
        }

        // Debug response
        console.log("Student details received:", {
          status: response.status,
          headers: response.headers,
          dataKeys: Object.keys(response.data),
        });

        // Update state with new data
        setStudentInfo((prevState) => ({
          ...prevState,
          personal: response.data.personal || {},
          academic: response.data.academic || {},
          medical: response.data.medical || {},
          father: response.data.father || {},
          mother: response.data.mother || {},
          // Add other sections as needed
        }));
      } catch (err) {
        // Enhanced error logging
        console.error("Error fetching student details:", {
          error: err,
          status: err.response?.status,
          data: err.response?.data,
          config: err.config,
          message: err.message,
        });

        // Handle specific error cases
        let errorMessage = "Failed to fetch student details";

        switch (err.response?.status) {
          case 401:
            errorMessage = "Your session has expired. Please log in again.";
            // Optional: Redirect to login
            // window.location.href = '/portal-login';
            break;
          case 403:
            errorMessage =
              "You do not have permission to view this student's details";
            break;
          case 404:
            errorMessage = "Student information not found";
            break;
          case 400:
            errorMessage = err.response.data?.error || "Invalid request";
            break;
          default:
            errorMessage =
              err.response?.data?.error || "An unexpected error occurred";
            break;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [!isAuthenticated]
  );

  // Usage example:
  useEffect(() => {
    if (selectedChild?.id) {
      fetchStudentDetails(selectedChild.id);
    }
  }, [selectedChild?.id, fetchStudentDetails]);

  // Update student information
  const updateStudentInfo = useCallback(
    async (section, data) => {
      if (!selectedChild) return;

      try {
        setLoading(true);
        await apiClientUpdate.patch(
          `portal/student/${selectedChild.id}/update/`,
          {
            section,
            data,
          }
        );

        // Refresh student details after update
        await fetchStudentDetails(selectedChild.id);
      } catch (err) {
        console.error("Error updating student:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [selectedChild?.id, isAuthenticated, fetchStudentDetails]
  );

  return {
    // Data
    children,
    selectedChild,
    studentInfo,
    loading,
    error,

    // Actions
    setSelectedChild,
    updateStudentInfo,
    refetchChildren: fetchChildren,
    refetchStudentDetails: fetchStudentDetails,
  };
};
