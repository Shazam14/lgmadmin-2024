import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminRoleContext } from "../../contexts/AdminRoleContext";

const ProtectedRoute = ({ children }) => {
  console.log("PROTECTED ROUTE!!!");
  const { isAdmin } = useContext(AdminRoleContext);
  return isAdmin ? children : <Navigate to="/admin-login" />;
};

export default ProtectedRoute;
