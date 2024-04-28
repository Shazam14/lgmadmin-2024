import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "../../../styles/admin.css";
import StudentsList from "./components/StudentList";
import TeachersList from "./components/TeachersList";
import ApplicantList from "./components/ApplicantList";
import CourseList from "./components/CourseList";
const AdminMainContent = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("dashboard");

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    console.log("handleMenuItemClick ", menuItem);
  };

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
      <AdminSidebar
        onMenuItemClick={handleMenuItemClick}
        selectedMenuItem={selectedMenuItem}
      />
      <div className="admin-content">{renderContent()}</div>
    </div>
  );
};

export default AdminMainContent;
