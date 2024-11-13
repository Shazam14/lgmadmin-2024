import React, { useState } from "react";

export const AddFieldModal = ({
  isOpen,
  onClose,
  onAdd,
  fieldTypes = [
    { value: "text", label: "Text" },
    { value: "textarea", label: "Text Area" },
    { value: "number", label: "Number" },
    { value: "date", label: "Date" },
  ],
}) => {
  const [field, setField] = useState({ name: "", type: "text" });

  const handleSubmit = () => {
    if (field.name.trim()) {
      onAdd(field);
      setField({ name: "", type: "text" });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
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
              value={field.name}
              onChange={(e) =>
                setField((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Field Type
            </label>
            <select
              value={field.type}
              onChange={(e) =>
                setField((prev) => ({ ...prev, type: e.target.value }))
              }
              className="w-full px-3 py-2 border rounded-md"
            >
              {fieldTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add Field
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
