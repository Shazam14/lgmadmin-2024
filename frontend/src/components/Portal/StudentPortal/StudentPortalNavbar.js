// components/Portal/StudentPortal/StudentPortalNavbar.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PortalAuthContext } from "../../../contexts/PortalAuthContext";
import { Bell, Settings, LogOut } from "lucide-react"; // Using Lucide icons
import "../../../styles/admin.css";

const StudentPortalNavbar = () => {
  const { portalLogout, portalUser } = useContext(PortalAuthContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await portalLogout();
      navigate("/portal-login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="admin-navbar">
      <div className="admin-navbar-left">
        <div className="icon">
          <svg viewBox="0 0 512 512">
            <path d="M45.63 79.75L52 81.25v58.5C45 143.9 40 151.3 40 160c0 8.375 4.625 15.38 11.12 19.75L35.5 242C33.75 248.9 37.63 256 43.13 256h41.75c5.5 0 9.375-7.125 7.625-13.1L76.88 179.8C83.38 175.4 88 168.4 88 160c0-8.75-5-16.12-12-20.25V87.13L128 99.63l.001 60.37c0 70.75 57.25 128 128 128s127.1-57.25 127.1-128L384 99.62l82.25-19.87c18.25-4.375 18.25-27 0-31.5l-190.4-46c-13-3-26.62-3-39.63 0l-190.6 46C27.5 52.63 27.5 75.38 45.63 79.75zM359.2 312.8l-103.2 103.2l-103.2-103.2c-69.93 22.3-120.8 87.2-120.8 164.5C32 496.5 47.53 512 66.67 512h378.7C464.5 512 480 496.5 480 477.3C480 400 429.1 335.1 359.2 312.8z" />
          </svg>
        </div>
        <div className="text">LGM STUDENT PORTAL</div>
      </div>

      <div className="admin-navbar-search">
        <input type="text" className="input search-bar" placeholder="Search" />
        <button className="button">Search</button>
      </div>

      <div className="admin-navbar-right">
        <div className="dynamic-text">
          {portalUser
            ? `${portalUser.first_name} ${portalUser.last_name}`
            : "Loading..."}
          ({portalUser?.user_type === "STUDENT" ? "Student" : "Parent"})
        </div>

        <div className="icons">
          <Bell className="icon" />
          <Settings className="icon" />

          {/* Add Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="icon-button"
            title="Logout"
          >
            <LogOut className="icon" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default StudentPortalNavbar;
