import React from "react";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";
import { LoadingSpinner } from "../../common/LoadingSpinner";

export const DataTable = ({
  data = [],
  columns = [],
  selected = [],
  onSelect,
  actions = [],
  loading = false,
  sortConfig,
  onSort,
  rowClassName,
}) => {
  // Handle sort click
  const handleSort = (key) => {
    if (!onSort) return;

    const direction =
      sortConfig?.key === key && sortConfig.direction === "asc"
        ? "desc"
        : "asc";

    onSort(key, direction);
  };

  // Get sort direction icon
  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return "↕️";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  // Handle row selection
  const handleRowSelect = (id) => {
    if (!onSelect) return;

    const newSelected = selected.includes(id)
      ? selected.filter((itemId) => itemId !== id)
      : [...selected, id];

    onSelect(newSelected);
  };

  // Handle select all
  const handleSelectAll = () => {
    if (!onSelect) return;

    if (selected.length === data.length) {
      onSelect([]);
    } else {
      onSelect(data.map((item) => item.id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {onSelect && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                  <Checkbox
                    checked={data.length > 0 && selected.length === data.length}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? "cursor-pointer select-none" : ""
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    {column.sortable && (
                      <span className="text-gray-400">
                        {getSortIcon(column.key)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (onSelect ? 1 : 0) +
                    (actions.length ? 1 : 0)
                  }
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((item, rowIndex) => (
                <tr
                  key={item.id}
                  className={`${
                    selected.includes(item.id) ? "bg-green-50" : ""
                  } hover:bg-gray-50 ${rowClassName?.(item, rowIndex) || ""}`}
                >
                  {onSelect && (
                    <td className="px-6 py-4 whitespace-nowrap w-8">
                      <Checkbox
                        checked={selected.includes(item.id)}
                        onCheckedChange={() => handleRowSelect(item.id)}
                        aria-label={`Select row ${rowIndex + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {column.render ? (
                        column.render(item[column.key], item)
                      ) : (
                        <span className="text-gray-900">
                          {item[column.key]}
                        </span>
                      )}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {actions.map((action, actionIndex) => (
                          <Button
                            key={actionIndex}
                            onClick={() => action.onClick(item)}
                            variant={action.variant || "ghost"}
                            size="sm"
                            disabled={action.disabled?.(item)}
                          >
                            {action.icon && (
                              <action.icon className="w-4 h-4 mr-1" />
                            )}
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
