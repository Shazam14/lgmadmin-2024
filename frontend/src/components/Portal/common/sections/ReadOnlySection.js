import React from "react";
export const ReadOnlySection = ({ title, icon: Icon, children, actions }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {Icon && <Icon className="text-green-600" />}
          {title}
        </h2>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
};
