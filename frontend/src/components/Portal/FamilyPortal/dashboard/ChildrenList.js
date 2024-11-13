import React from "react";
import { FaUser } from "react-icons/fa";
export const ChildrenList = ({ children, selectedChild, onSelectChild }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children.map((child) => (
        <div
          key={child.id}
          className={`cursor-pointer rounded-lg border bg-white p-6 transition-all hover:shadow-md
            ${selectedChild?.id === child.id ? "ring-2 ring-green-500" : ""}
          `}
          onClick={() => onSelectChild(child)}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <FaUser className="text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {child.firstName} {child.lastName}
              </h3>
              <p className="text-sm text-gray-500">
                {child.grade} - {child.section}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
