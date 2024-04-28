import React, { useContext } from "react";
import { AdminRoleContext } from "../contexts/AdminRoleContext";
import AdminNavbar from "../components/Portal/AdminPortal/AdminNavbar";
import "../styles/admin.css";
import AdminMainContent from "../components/Portal/AdminPortal/AdminMainContent";
import Footer from "../components/Footer/Footer";

const AdminPortalPage = () => {
  // const { isAdmin } = useContext(AdminRoleContext);

  // if (!isAdmin) {
  //   return <p>Access denied. You must be an admin to view this page.</p>;
  // }

  return (
    <div className="admin-portal-page">
      <AdminNavbar />
      <AdminMainContent />
      <Footer />
    </div>
  );
};

export default AdminPortalPage;
