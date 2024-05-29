import React, { createContext, useState } from "react";

export const AdminRoleContext = createContext();

export const AdminRoleProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const updateAdminRole = (value) => {
    console.log("Updating the admin role", value);
    setIsAdmin(value);
  };

  return (
    <AdminRoleContext.Provider value={{ isAdmin, updateAdminRole }}>
      {children}
    </AdminRoleContext.Provider>
  );
};
