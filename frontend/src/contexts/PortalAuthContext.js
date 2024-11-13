// src/contexts/PortalAuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import apiClientUpdate from "../services/apiClientUpdate";

// Create auth context
export const PortalAuthContext = createContext(null);

// Get environment from .env file
const CURRENT_ENV = process.env.REACT_APP_ENV || "development";

// Cookie options based on environment
const AUTH_COOKIE_OPTIONS = {
  path: "/",
  // Only use secure cookies in production
  secure: CURRENT_ENV === "production",
  // Use appropriate SameSite setting
  sameSite: CURRENT_ENV === "production" ? "Strict" : "Lax",
  // Set domain if needed
  domain:
    CURRENT_ENV === "production" ? ".learninggardenmontessori.ph" : undefined,
};

const STORAGE_KEYS = {
  USER_PROFILE: "portal_user_profile",
};

export const PortalAuthProvider = ({ children }) => {
  // State
  const [portalUser, setPortalUser] = useState(null);
  const [isParent, setIsParent] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verify auth status on mount
  useEffect(() => {
    const verifyAuth = async () => {
      const token = Cookies.get("portal_access_token");

      // Try to get cached user profile
      const cachedProfile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);

      if (token && cachedProfile) {
        try {
          const profile = JSON.parse(cachedProfile);
          setPortalUser(profile);
          setIsParent(profile.user_type === "PARENT");
          setIsStudent(profile.user_type === "STUDENT");
        } catch (e) {
          console.error("Error parsing cached profile:", e);
        }
      }

      // Verify with backend if token exists
      if (token) {
        try {
          const response = await apiClientUpdate.get("portal/auth/verify/");
          handleAuthSuccess(response.data);
        } catch (err) {
          handleAuthError(err);
        }
      }

      setLoading(false);
    };

    verifyAuth();
  }, []);

  // Helper functions
  const handleAuthSuccess = ({ access, refresh, user_profile }) => {
    // Set tokens
    Cookies.set("portal_access_token", access, AUTH_COOKIE_OPTIONS);
    Cookies.set("portal_refresh_token", refresh, AUTH_COOKIE_OPTIONS);

    // Set user state
    setPortalUser(user_profile);
    setIsParent(user_profile.user_type === "PARENT");
    setIsStudent(user_profile.user_type === "STUDENT");

    // Cache user profile
    localStorage.setItem(
      STORAGE_KEYS.USER_PROFILE,
      JSON.stringify(user_profile)
    );

    setError(null);
  };

  const handleAuthError = (error) => {
    console.error("Auth error:", error);
    clearAuthState();
    setError(error.response?.data?.message || "Authentication failed");
  };

  const clearAuthState = () => {
    // Clear cookies
    Cookies.remove("portal_access_token", { path: "/" });
    Cookies.remove("portal_refresh_token", { path: "/" });

    // Clear state
    setPortalUser(null);
    setIsParent(false);
    setIsStudent(false);

    // Clear storage
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);

    setError(null);
  };

  // Auth actions
  const portalLogin = async (email, password, userType) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClientUpdate.post("portal/auth/login/", {
        email,
        password,
        user_type: userType,
      });

      handleAuthSuccess(response.data);
      return response.data.user_profile;
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const portalSignup = async (signupData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClientUpdate.post(
        "portal/auth/signup/",
        signupData
      );

      handleAuthSuccess(response.data);
      return response.data.user_profile;
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const portalLogout = async () => {
    try {
      // Call logout endpoint if needed
      await apiClientUpdate.post("portal/auth/logout/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuthState();
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!portalUser && !!Cookies.get("portal_access_token");
  };

  return (
    <PortalAuthContext.Provider
      value={{
        // State
        portalUser,
        isParent,
        isStudent,
        loading,
        error,

        // Auth status
        isAuthenticated,

        // Actions
        portalLogin,
        portalSignup,
        portalLogout,

        // Error handling
        clearError: () => setError(null),
      }}
    >
      {children}
    </PortalAuthContext.Provider>
  );
};

// Custom hook with type checking
export const usePortalAuth = () => {
  const context = useContext(PortalAuthContext);
  if (!context) {
    throw new Error("usePortalAuth must be used within a PortalAuthProvider");
  }
  return context;
};
