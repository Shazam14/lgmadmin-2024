// components/Portal/AdminPortal/components/FilterBar.jsx
import React, { useState } from "react";
import { Button } from "../../../ui/button";
export const FilterBar = ({ filters, onFilterChange, activeTab }) => {
  const filterOptions = {
    applicants: [
      {
        key: "status",
        label: "Status",
        options: ["All", "Pending", "Approved", "Rejected"],
      },
      {
        key: "program",
        label: "Program",
        options: ["All", "Elementary", "High School", "Special Education"],
      },
    ],
    students: [
      {
        key: "grade",
        label: "Grade Level",
        options: ["All", "Grade 1", "Grade 2", "Grade 3"],
      },
      { key: "section", label: "Section", options: ["All", "A", "B", "C"] },
    ],
    // Add more filter options for other tabs
  };

  const currentFilters = filterOptions[activeTab] || [];

  if (!currentFilters.length) return null;

  return (
    <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow">
      {currentFilters.map((filter) => (
        <div key={filter.key} className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            {filter.label}
          </label>
          <select
            value={filters[filter.key] || "All"}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                [filter.key]: e.target.value,
              })
            }
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {filter.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      <Button
        variant="outline"
        onClick={() => onFilterChange({})}
        className="ml-auto"
      >
        Clear Filters
      </Button>
    </div>
  );
};
