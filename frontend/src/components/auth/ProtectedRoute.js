import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AdminRoleContext } from "../../contexts/AdminRoleContext";

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useContext(AdminRoleContext);
  return isAdmin ? children : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;
