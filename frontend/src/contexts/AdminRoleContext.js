// src/contexts/AdminRoleContext.js

import React, { createContext, useState } from "react";

export const AdminRoleContext = createContext();

export const AdminRoleProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Add any necessary functions or state management related to admin roles

  return (
    <AdminRoleContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminRoleContext.Provider>
  );
};
