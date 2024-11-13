// src/hooks/usePortalData.js
import { useState, useEffect, useCallback } from "react";
import { usePortalAuth } from "../contexts/PortalAuthContext";
import apiClient from "../services/apiClient";
import { transformStudentData } from "../utils/transformers"; // We'll create this later if needed

export const usePortalData = () => {
  const { isParent, isStudent } = usePortalAuth();
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
    try {
      setLoading(true);
      const response = await apiClient.get("portal/children/");
      console.log(response, "RESPONSE 103");
      setChildren(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching children:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch student details
  const fetchStudentDetails = useCallback(async (studentId) => {
    if (!studentId) return;

    try {
      setLoading(true);
      const response = await apiClient.get(
        `/portal/student/${studentId}/details/`
      );
      setStudentInfo(transformStudentData(response.data)); // Transform the data if needed
      setError(null);
    } catch (err) {
      console.error("Error fetching student details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update student information
  const updateStudentInfo = useCallback(
    async (section, data) => {
      if (!selectedChild) return;

      try {
        setLoading(true);
        await apiClient.patch(
          `/portal/student/${selectedChild.id}/${section}/`,
          data
        );

        // Refresh student data after update
        await fetchStudentDetails(selectedChild.id);
        setError(null);
      } catch (err) {
        console.error("Error updating student info:", err);
        setError(err.message);
        throw err; // Re-throw to handle in component
      } finally {
        setLoading(false);
      }
    },
    [selectedChild, fetchStudentDetails]
  );

  // Initial data fetch
  useEffect(() => {
    if (isParent) {
      fetchChildren();
    }
  }, [isParent, fetchChildren]);

  // Fetch student details when selected child changes
  useEffect(() => {
    if (selectedChild) {
      fetchStudentDetails(selectedChild.id);
    }
  }, [selectedChild, fetchStudentDetails]);

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
