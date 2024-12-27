import React from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { usePortalAuth } from "../../../../contexts/PortalAuthContext";

export const BaseSection = ({
  title,
  section,
  children,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  showEditButton = true,
  icon: Icon, // Optional icon component
}) => {
  const { isParent } = usePortalAuth();

  // Determine if section is editable
  const isEditableSection = () => {
    if (!isParent) return false;
    const readOnlySections = ["grades", "tuition", "documents"];
    return !readOnlySections.includes(section);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {Icon && <Icon className="text-green-600" />}
          {title}
        </h2>

        {showEditButton && isEditableSection() && (
          <div className="flex gap-2">
            {!isEditing ? (
              <button
                onClick={onEdit}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <FaEdit /> Edit
              </button>
            ) : (
              <>
                <button
                  onClick={onSave}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  <FaSave /> Save
                </button>
                <button
                  onClick={onCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  <FaTimes /> Cancel
                </button>
              </>
            )}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
