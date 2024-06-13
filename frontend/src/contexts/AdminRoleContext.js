// src/contexts/AdminRoleContext.js
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AdminRoleContext = createContext();

export const AdminRoleProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedIsAdmin = Cookies.get("is_admin");
    if (storedIsAdmin) {
      setIsAdmin(storedIsAdmin === "true");
    }
  }, []);

  return (
    <AdminRoleContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminRoleContext.Provider>
  );
};