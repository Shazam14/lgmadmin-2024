import React from "react";
export const EditableField = ({
  field,
  value,
  onChange,
  isEditing,
  type = "text",
  textArea = false,
  className = "",
}) => {
  const label = field.replace(/([A-Z])/g, " $1").trim();

  if (textArea) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 capitalize">
          {label}
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={!isEditing}
          className={`w-full px-3 py-2 border rounded-md ${
            !isEditing
              ? "bg-gray-50 text-gray-500"
              : "border-gray-300 focus:ring-2 focus:ring-green-500"
          } ${className}`}
          rows={3}
        />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 capitalize">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!isEditing}
        className={`w-full px-3 py-2 border rounded-md ${
          !isEditing
            ? "bg-gray-50 text-gray-500"
            : "border-gray-300 focus:ring-2 focus:ring-green-500"
        } ${className}`}
      />
    </div>
  );
};
