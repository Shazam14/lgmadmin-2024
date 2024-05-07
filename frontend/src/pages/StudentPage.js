// In ./pages/StudentPage
import React from "react";
import StudentTab from "../components/Portal/AdminPortal/Admin/StudentTab";
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
