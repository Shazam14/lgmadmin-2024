import React from "react";
import StudentCourse from "./StudentCourse";
import { Outlet } from "react-router-dom";
const StudentPortal = () => {
  return (
    <div className="admin-portal-page">
      <StudentCourse />
    </div>
  );
};

export default StudentPortal;
