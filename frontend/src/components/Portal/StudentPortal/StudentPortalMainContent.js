import React from "react";
import StudentPortalLessons from "./StudentPortalLessons";
import { Outlet } from "react-router-dom";
const StudentPortal = () => {
  return (
    <div className="admin-portal-page">
      <StudentPortalLessons />
    </div>
  );
};

export default StudentPortal;
