// src/components/Portal/FamilyPortal/FamilyPortalSample.js
import React, { useState, useEffect, useCallback } from "react";
import { usePortalData } from "../../../hooks/usePortalData";
import { usePortalAccess } from "../../../hooks/usePortalAccess";
import { BaseSection } from "../common/sections/BaseSection";
import { GradesSection } from "../common/sections/GradesSection";
import { TuitionSection } from "../common/sections/TuitionSection";
import { DocumentsSection } from "../common/sections/DocumentsSection";
import { AddFieldModal } from "../common/sections/AddFieldModal";
import { EditableField } from "../common/sections/EditableSection";
import {
  FaUser,
  FaHeartbeat,
  FaBrain,
  FaMale,
  FaFemale,
  FaHome,
  FaBook,
  FaCreditCard,
  FaFileAlt,
} from "react-icons/fa";

import { QuickStats } from "./dashboard/QuickStats";
import { ChildrenList } from "./dashboard/ChildrenList";
import { ErrorBoundary } from "../common/ErrorBoundary";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { CharacteristicsSection } from "../common/sections/CharacteristicsSection";
import PortalNavBar from "../common/layouts/PortalNavBar/PortalNavBar";
const FamilyPortalSample = () => {
  // Get portal data using your hook
  const {
    children,
    loading,
    error,
    selectedChild,
    setSelectedChild,
    studentInfo,
    updateStudentInfo,
  } = usePortalData();

  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [showFieldModal, setShowFieldModal] = useState(false);

  useEffect(() => {
    console.log("trying to select child:", selectedChild);
  }, [children, selectedChild]);

  if (loading && !children.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        <p>{error}</p>
      </div>
    );
  }

  // Tab configuration
  const tabs = [
    { id: "personal", label: "Personal Info", icon: FaUser },
    { id: "characteristics", label: "Characteristics", icon: FaBrain },
    { id: "medical", label: "Medical History", icon: FaHeartbeat },
    { id: "father", label: "Father's Info", icon: FaMale },
    { id: "mother", label: "Mother's Info", icon: FaFemale },
    { id: "living", label: "Living Arrangements", icon: FaHome },
    { id: "grades", label: "Grades", icon: FaBook },
    { id: "tuition", label: "Tuition", icon: FaCreditCard },
    { id: "documents", label: "Documents", icon: FaFileAlt },
  ];

  // Section handlers
  const handleEdit = () => setIsEditing(true);
  const handleSave = async () => {
    try {
      await updateStudentInfo(activeTab, studentInfo[activeTab]);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving changes:", error);
      // Handle error (show notification, etc.)
    }
  };
  const handleCancel = () => setIsEditing(false);

  const handleInputChange = (field, value) => {
    updateStudentInfo(activeTab, {
      ...studentInfo[activeTab],
      [field]: value,
    });
  };

  return (
    <>
      <PortalNavBar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">LGMS Family Portal</h1>
          <button className="text-sm text-gray-500 hover:text-green-600 transition-colors">
            Need help?
          </button>
        </div>

        {/* Dashboard or Student Profile */}
        {!selectedChild ? (
          <>
            <QuickStats
              childrenCount={children.length}
              // Add other stats
            />
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Your Children</h2>
              <ChildrenList
                children={children}
                selectedChild={selectedChild}
                onSelectChild={setSelectedChild}
                loading={loading}
              />
            </div>
          </>
        ) : (
          <div>
            {/* Student Header */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedChild(null)}
                  >
                    ← Back
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold">
                      {studentInfo.personal.firstName}{" "}
                      {studentInfo.personal.lastName}
                    </h1>
                    <p className="text-gray-600">
                      {studentInfo.grade} - {studentInfo.section}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <tab.icon /> {tab.label}
                </button>
              ))}
            </div>

            {/* Content Sections */}
            <div>
              {/* Editable Sections */}
              {["personal", "medical", "father", "mother", "living"].includes(
                activeTab
              ) && (
                <BaseSection
                  title={tabs.find((t) => t.id === activeTab)?.label}
                  section={activeTab}
                  icon={tabs.find((t) => t.id === activeTab)?.icon}
                  isEditing={isEditing}
                  onEdit={handleEdit}
                  onSave={handleSave}
                  onCancel={handleCancel}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {studentInfo &&
                      studentInfo[activeTab] &&
                      Object.entries(studentInfo[activeTab]).map(
                        ([field, value]) => (
                          <EditableField
                            key={field}
                            field={field}
                            value={value}
                            onChange={(value) =>
                              handleInputChange(field, value)
                            }
                            isEditing={isEditing}
                            type={
                              field.includes("date") || field === "birthday"
                                ? "date"
                                : "text"
                            }
                            textArea={[
                              "interests",
                              "strengths",
                              "challenges",
                            ].includes(field)}
                          />
                        )
                      )}
                  </div>
                </BaseSection>
              )}
              {/* Read-only Sections */}
              {/* Separated Section Components */}
              {activeTab === "characteristics" && (
                <ErrorBoundary>
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <CharacteristicsSection
                      studentInfo={studentInfo}
                      isEditing={isEditing}
                      onEdit={handleEdit}
                      onSave={handleSave}
                      onCancel={handleCancel}
                      updateStudentInfo={updateStudentInfo}
                    />
                  )}
                </ErrorBoundary>
              )}
              {activeTab === "grades" && (
                <ErrorBoundary>
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <GradesSection studentInfo={studentInfo} />
                  )}
                </ErrorBoundary>
              )}
              {activeTab === "tuition" && (
                <TuitionSection studentInfo={studentInfo} />
              )}
              {activeTab === "documents" && (
                <DocumentsSection studentInfo={studentInfo} />
              )}
              {/* Similar sections for tuition and documents */}
            </div>
          </div>
        )}

        {/* Add Field Modal */}
        <AddFieldModal
          isOpen={showFieldModal}
          onClose={() => setShowFieldModal(false)}
          onAdd={(field) => {
            // Handle adding custom field
          }}
        />
      </div>
    </>
  );
};

export default React.memo(FamilyPortalSample);
