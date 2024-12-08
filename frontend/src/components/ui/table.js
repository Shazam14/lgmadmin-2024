// src/components/ui/table.jsx
import React from "react";

export const Table = ({ children, className = "" }) => (
  <div className="w-full overflow-auto">
    <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
      {children}
    </table>
  </div>
);

export const TableHead = ({ children, className = "" }) => (
  <thead className={`bg-gray-50 ${className}`}>{children}</thead>
);

export const TableBody = ({ children, className = "" }) => (
  <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>
    {children}
  </tbody>
);

export const TableRow = ({ children, className = "" }) => (
  <tr className={`hover:bg-gray-50 ${className}`}>{children}</tr>
);

export const TableCell = ({ children, className = "" }) => (
  <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>
);

export const TableHeaderCell = ({ children, className = "" }) => (
  <th
    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
  >
    {children}
  </th>
);
