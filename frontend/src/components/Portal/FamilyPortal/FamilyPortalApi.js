import React, { useState, useEffect } from "react";
import { usePortalAuth } from "../../../contexts/PortalAuthContext";
import apiClientUpdate from "../../../services/apiClientUpdate";
import { FaUser } from "react-icons/fa";

const FamilyPortalDemo = () => {
  const { portalUser, isParent } = usePortalAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);

  // Fetch children when component mounts
  useEffect(() => {
    if (isParent) {
      fetchChildren();
    }
  }, [isParent]);

  // Fetch student details when selected child changes
  useEffect(() => {
    if (selectedChild) {
      fetchStudentDetails(selectedChild);
    }
  }, [selectedChild]);

  const fetchChildren = async () => {
    try {
      const response = await apiClientUpdate.get("/portal/parent/children/");
      setChildren(response.data);
      if (response.data.length > 0) {
        setSelectedChild(response.data[0].id);
      }
    } catch (err) {
      setError("Failed to fetch children");
      console.error("Error fetching children:", err);
    }
  };

  const fetchStudentDetails = async (studentId) => {
    setLoading(true);
    try {
      const response = await apiClientUpdate.get(
        `/portal/student/${studentId}/details/`
      );
      setStudentInfo(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch student details");
      console.error("Error fetching student details:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = () => setIsEditing(true);
  const handleSave = async () => {
    try {
      await apiClientUpdate.patch(`/portal/student/${selectedChild}/update/`, {
        section: activeTab,
        data: studentInfo[activeTab],
      });
      setIsEditing(false);
      // Refresh data
      fetchStudentDetails(selectedChild);
    } catch (err) {
      setError("Failed to save changes");
      console.error("Error saving changes:", err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Refresh data to revert changes
    fetchStudentDetails(selectedChild);
  };

  const handleInputChange = (section, field, value) => {
    setStudentInfo((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Add child selection dropdown at the top
  const renderChildSelection = () => (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Child
      </label>
      <select
        value={selectedChild || ""}
        onChange={(e) => setSelectedChild(e.target.value)}
        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
      >
        {children.map((child) => (
          <option key={child.id} value={child.id}>
            {child.first_name} {child.last_name} - {child.grade}
          </option>
        ))}
      </select>
    </div>
  );

  if (loading && !studentInfo) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>;
  }

  const renderStudentHeader = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <FaUser className="text-green-600 text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {`${studentInfo.personal.firstName} ${studentInfo.personal.lastName}`}
            </h1>
            <p className="text-gray-600">
              {studentInfo.academic.grade} - {studentInfo.academic.section}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Student ID</p>
          <strong className="text-lg">{studentInfo.academic.studentId}</strong>
        </div>
      </div>
    </div>
  );

  // Rest of your existing render functions...
  // Keep renderStudentHeader, renderEditableSection, renderGradesTable as they are

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {isParent && renderChildSelection()}
      {studentInfo && (
        <>
          {renderStudentHeader()}

          <div className="flex flex-wrap gap-2 mb-6">
            {/* Your existing tab buttons */}
          </div>

          <div>{/* Your existing tab content rendering */}</div>
        </>
      )}
    </div>
  );
};

export default FamilyPortalDemo;
