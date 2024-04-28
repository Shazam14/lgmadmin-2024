import React from "react";
import { UserRoleProvider } from "./contexts/UserRoleContext";
import { AdminRoleProvider } from "./contexts/AdminRoleContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPortalPage from "./pages/AdminPortalPage";
import "./styles/app.css";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CourseForm from "./components/Courses/CourseForm/CourseForm";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StudentList from "./components/Portal/AdminPortal/components/StudentList";

function App() {
  return (
    <UserRoleProvider>
      <AdminRoleProvider>
        <Router>
          <Routes>
            <Route path="/admin" element={<AdminPortalPage />} />
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/courses/*" element={<CoursesPage />}></Route>
            <Route path="/course-form/*" element={<CourseForm />}></Route>
            <Route path="/students" element={<StudentList />}></Route>
          </Routes>
        </Router>
      </AdminRoleProvider>
    </UserRoleProvider>
  );
}

export default App;
