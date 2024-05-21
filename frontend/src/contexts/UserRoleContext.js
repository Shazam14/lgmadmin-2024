// src/contexts/UserRoleContext.js

import React, { createContext, useState } from "react";

export const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  // Add any necessary functions or state management related to user roles

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};
