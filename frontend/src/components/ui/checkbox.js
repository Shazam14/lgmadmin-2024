// src/components/ui/checkbox.js
import React from "react";

const Checkbox = ({ checked, onChange, ...props }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={onChange}
    className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
    {...props}
  />
);

export { Checkbox };
