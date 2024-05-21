import React, { useContext } from "react";
import { AdminRoleContext } from "../contexts/AdminRoleContext";
import "../styles/admin.css";
import AdminMainContent from "../components/Portal/AdminPortal/Admin/AdminMainContent";
import AdminNavbar from "../components/Portal/AdminPortal/Admin/AdminNavbar";
import AdminSidebar from "../components/Portal/AdminPortal/Admin/AdminSidebar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
const AdminPortalPage = () => {
  return (
    <div>
      <AdminNavbar /> {/* Navbar at the top */}
      <div className="admin-body">
        <div>
          <AdminSidebar />
        </div>
        <div className="admin-main">
          <Outlet />{" "}
        </div>
      </div>
      <Footer /> {/* Footer at the bottom */}
    </div>
  );
};

export default AdminPortalPage;
