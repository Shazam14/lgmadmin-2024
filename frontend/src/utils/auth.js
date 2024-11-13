// src/utils/auth.js
export const clearAuthTokens = (isPortal = false) => {
  if (isPortal) {
    Cookies.remove("portal_access_token");
    Cookies.remove("portal_refresh_token");
  } else {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  }
};

export const hasValidToken = (isPortal = false) => {
  const token = Cookies.get(isPortal ? "portal_access_token" : "access_token");
  return !!token;
};
