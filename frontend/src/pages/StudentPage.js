// In ./pages/StudentPage
import React from "react";
import StudentTab from "../components/Portal/AdminPortal/Admin/StudentTab";
import Parents from "../components/Portal/AdminPortal/Parents/Parents";
import AdminNavbar from "../components/Portal/AdminPortal/Admin/AdminNavbar";
import AdminSidebar from "../components/Portal/AdminPortal/Admin/AdminSidebar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
const StudentPage = () => {
  return (
    <div className="admin-portal-page">
      <StudentTab />
      <Outlet />
    </div>
  );
};

export default StudentPage;
