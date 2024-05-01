import React, { useContext } from "react";
import { AdminRoleContext } from "../contexts/AdminRoleContext";
import "../styles/admin.css";
import AdminMainContent from "../components/Portal/AdminPortal/Admin/AdminMainContent";
import AdminNavbar from "../components/Portal/AdminPortal/Admin/AdminNavbar";
import Footer from "../components/Footer/Footer";
const AdminPortalPage = () => {
  return (
    <div className="admin-portal-page">
      <AdminNavbar />
      <AdminMainContent />
      <Footer />
    </div>
  );
};

export default AdminPortalPage;
