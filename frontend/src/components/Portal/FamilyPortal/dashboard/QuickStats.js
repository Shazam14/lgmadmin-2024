import React from "react";

import { FaUser } from "react-icons/fa";
export const QuickStats = ({ childrenCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-green-100">
            <FaUser className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Children</p>
            <p className="text-2xl font-bold">{childrenCount}</p>
          </div>
        </div>
      </div>
      {/* Add other stats as needed */}
    </div>
  );
};
