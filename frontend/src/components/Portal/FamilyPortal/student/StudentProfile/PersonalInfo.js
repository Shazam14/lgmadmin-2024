// src/components/Portal/FamilyPortal/student/StudentProfile/PersonalInfo.js
import React from "react";
import { FaUser } from "react-icons/fa";
import { BaseSection } from "../../../common/sections/BaseSection";
import { EditableField } from "../../../common/sections/EditableSection";

export const PersonalInfo = ({
  data,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onInputChange,
}) => {
  return (
    <BaseSection
      title="Personal Information"
      section="personal"
      icon={FaUser}
      isEditing={isEditing}
      onEdit={onEdit}
      onSave={onSave}
      onCancel={onCancel}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(data).map(([field, value]) => (
          <EditableField
            key={field}
            field={field}
            value={value}
            onChange={(value) => onInputChange(field, value)}
            isEditing={isEditing}
            type={
              field.includes("date") || field === "birthday" ? "date" : "text"
            }
          />
        ))}
      </div>
    </BaseSection>
  );
};
