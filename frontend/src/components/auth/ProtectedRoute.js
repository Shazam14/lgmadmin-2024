// src/components/auth/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { PortalAuthContext } from "../../contexts/PortalAuthContext";
import { AdminRoleContext } from "../../contexts/AdminRoleContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ authenticated, children, routeType = "admin" }) => {
  const { portalUser, isParent, isStudent } = useContext(PortalAuthContext);
  const { isAdmin } = useContext(AdminRoleContext);

  // Helper function to determine redirect path
  const getRedirectPath = () => {
    switch (routeType) {
      case "admin":
        return "/admin-login";
      case "parent":
      case "student":
      case "portal":
        return "/portal-login";
      default:
        return "/";
    }
  };

  // Check authentication based on route type
  const isAuthenticated = () => {
    switch (routeType) {
      case "admin":
        return authenticated && isAdmin;
      case "parent":
        return portalUser && isParent;
      case "student":
        return portalUser && isStudent;
      case "portal":
        return portalUser;
      default:
        return false;
    }
  };

  // If not authenticated, redirect to appropriate login page
  if (!isAuthenticated()) {
    return <Navigate to={getRedirectPath()} />;
  }

  // Additional role-based checks
  if (routeType === "parent" && !isParent) {
    return <Navigate to="/portal-login" />;
  }

  if (routeType === "student" && !isStudent) {
    return <Navigate to="/portal-login" />;
  }

  // If authenticated and passes role checks, render children
  return children;
};

ProtectedRoute.propTypes = {
  authenticated: PropTypes.bool,
  children: PropTypes.node.isRequired,
  routeType: PropTypes.oneOf(["admin", "portal", "parent", "student"]),
};

ProtectedRoute.defaultProps = {
  authenticated: false,
  routeType: "admin",
};

export default ProtectedRoute;
