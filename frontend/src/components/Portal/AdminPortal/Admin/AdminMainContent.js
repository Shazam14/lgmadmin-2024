import React, { useState } from "react";
import { useAdminUI } from "../../../../contexts/AdminUIContext";
import AdminSidebar from "./AdminSidebar";
import StudentsList from "../Students/StudentList";
import TeachersList from "../Teachers/TeachersList";
import ApplicantList from "../Applicants/ApplicantList";
import CourseList from "../Courses/CourseList";
import "../../../../styles/admin.css";
const AdminMainContent = () => {
  const { selectedMenuItem } = useAdminUI();

  /* const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    console.log("handleMenuItemClick ", menuItem);
  }; */

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "dashboard":
        return <div className="admin-content-dashboard">Dashboard Content</div>;
      case "courses":
        return <CourseList />;
      case "grades":
        return <div className="admin-content-grades">Grades Content</div>;
      case "schedules":
        return <div className="admin-content-schedules">Schedules</div>;
      case "lesson_plan":
        return <div className="admin-content-schedules">Lesson Plan</div>;
      case "applicants":
        return <ApplicantList />;
      case "students":
        return <StudentsList />;
      case "teachers":
        return <TeachersList />;
      // Add more cases for other menu items
      default:
        return null;
    }
  };

  return (
    <div className="admin-main-content">
      <AdminSidebar />
      <div className="admin-content">{renderContent()}</div>
    </div>
  );
};

export default AdminMainContent;
