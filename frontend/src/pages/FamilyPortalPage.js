import React, { useContext } from "react";
import { AdminRoleContext } from "../contexts/AdminRoleContext";
import "../styles/admin.css";
import StudentPortalNavbar from "../components/Portal/StudentPortal/StudentPortalNavbar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import StudentPortalSidebar from "../components/Portal/StudentPortal/StudentPortalSidebar";
const StudentPortalPage = () => {
  return (
    <div>
      <StudentPortalNavbar /> {/* Navbar at the top */}
      <div className="admin-body">
        <div>
          <StudentPortalSidebar />
        </div>
        <div className="admin-main">
          <Outlet />{" "}
        </div>
      </div>
      <Footer /> {/* Footer at the bottom */}
    </div>
  );
};

export default StudentPortalPage;
