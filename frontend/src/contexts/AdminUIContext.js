// src/contexts/AdminUIContext.js
import React, { createContext, useState, useContext } from "react";

const AdminUIContext = createContext();

export const useAdminUI = () => useContext(AdminUIContext);

export const AdminUIProvider = ({ children }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");

  const onMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <AdminUIContext.Provider value={{ selectedMenuItem, onMenuItemClick }}>
      {children}
    </AdminUIContext.Provider>
  );
};
