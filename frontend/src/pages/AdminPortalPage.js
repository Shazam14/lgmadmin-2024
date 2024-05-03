import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AdminRoleContext } from "../contexts/AdminRoleContext";
import "../styles/admin.css";
import AdminMainContent from "../components/Portal/AdminPortal/Admin/AdminMainContent";
import AdminNavbar from "../components/Portal/AdminPortal/Admin/AdminNavbar";
import AdminSidebar from "../components/Portal/AdminPortal/Admin/AdminSidebar";
import Footer from "../components/Footer/Footer";
const AdminPortalPage = () => {
  return (
    <div className="admin-portal-page">
      <AdminNavbar />
      <div>
        <AdminSidebar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPortalPage;
