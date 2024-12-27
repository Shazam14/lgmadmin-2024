// components/Portal/FamilyPortal/sections/CharacteristicsSection.js
import React, { useState } from "react";
import { FaBrain, FaPlus, FaTags } from "react-icons/fa";
import { BaseSection } from "../../common/sections/BaseSection";
import { EditableField } from "../../common/sections/EditableSection";

const TRAITS_OPTIONS = [
  "Adaptable",
  "Creative",
  "Analytical",
  "Collaborative",
  "Detail-oriented",
  "Empathetic",
  "Focused",
  "Independent",
  "Leader",
  "Organized",
  "Patient",
  "Resilient",
  "Self-motivated",
  "Team player",
  "Innovative",
];

export const CharacteristicsSection = ({
  studentInfo,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  updateStudentInfo,
}) => {
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [newField, setNewField] = useState({ name: "", type: "text" });

  const handleTraitToggle = (trait) => {
    const currentTraits = studentInfo.characteristics.selectedTraits || [];
    const newTraits = currentTraits.includes(trait)
      ? currentTraits.filter((t) => t !== trait)
      : [...currentTraits, trait];

    updateStudentInfo("characteristics", {
      ...studentInfo.characteristics,
      selectedTraits: newTraits,
    });
  };

  const handleAddField = () => {
    if (newField.name) {
      updateStudentInfo("characteristics", {
        ...studentInfo.characteristics,
        customFields: {
          ...studentInfo.characteristics.customFields,
          [newField.name]: {
            type: newField.type,
            value: "",
          },
        },
      });
      setNewField({ name: "", type: "text" });
      setShowFieldModal(false);
    }
  };

  const handleInputChange = (field, value) => {
    updateStudentInfo("characteristics", {
      ...studentInfo.characteristics,
      [field]: value,
    });
  };

  return (
    <>
      <BaseSection
        title="Characteristics"
        icon={FaBrain}
        isEditing={isEditing}
        onEdit={onEdit}
        onSave={onSave}
        onCancel={onCancel}
        additionalActions={
          isEditing && (
            <button
              onClick={() => setShowFieldModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              <FaPlus /> Add Field
            </button>
          )
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Regular Fields */}
          {Object.entries(studentInfo.characteristics).map(([field, value]) => {
            if (field === "selectedTraits" || field === "customFields")
              return null;

            return (
              <EditableField
                key={field}
                field={field}
                value={value}
                onChange={(value) => handleInputChange(field, value)}
                isEditing={isEditing}
                textArea={["interests", "strengths", "challenges"].includes(
                  field
                )}
              />
            );
          })}

          {/* Traits Selection */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaTags className="inline mr-2" />
              Character Traits
            </label>
            <div className="flex flex-wrap gap-2">
              {TRAITS_OPTIONS.map((trait) => (
                <button
                  key={trait}
                  onClick={() => isEditing && handleTraitToggle(trait)}
                  disabled={!isEditing}
                  className={`px-3 py-1 rounded-full text-sm ${
                    studentInfo.characteristics.selectedTraits?.includes(trait)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } ${isEditing ? "hover:opacity-80" : ""} transition-colors`}
                >
                  {trait}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Fields */}
          {studentInfo.characteristics.customFields &&
            Object.entries(studentInfo.characteristics.customFields).map(
              ([fieldName, fieldData]) => (
                <div key={fieldName} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {fieldName.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  {fieldData.type === "textarea" ? (
                    <textarea
                      value={fieldData.value}
                      onChange={(e) =>
                        handleInputChange(
                          `customFields.${fieldName}.value`,
                          e.target.value
                        )
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-md ${
                        !isEditing
                          ? "bg-gray-50 text-gray-500"
                          : "border-gray-300 focus:ring-2 focus:ring-green-500"
                      }`}
                      rows={3}
                    />
                  ) : (
                    <input
                      type={fieldData.type}
                      value={fieldData.value}
                      onChange={(e) =>
                        handleInputChange(
                          `customFields.${fieldName}.value`,
                          e.target.value
                        )
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-md ${
                        !isEditing
                          ? "bg-gray-50 text-gray-500"
                          : "border-gray-300 focus:ring-2 focus:ring-green-500"
                      }`}
                    />
                  )}
                </div>
              )
            )}
        </div>
      </BaseSection>

      {/* Add Field Modal */}
      {showFieldModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Field</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Field Name
                </label>
                <input
                  type="text"
                  value={newField.name}
                  onChange={(e) =>
                    setNewField((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Field Type
                </label>
                <select
                  value={newField.type}
                  onChange={(e) =>
                    setNewField((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="text">Text</option>
                  <option value="textarea">Text Area</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowFieldModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddField}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add Field
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
