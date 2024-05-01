import React from "react";
import { UserRoleProvider } from "./contexts/UserRoleContext";
import { AdminRoleProvider } from "./contexts/AdminRoleContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPortalPage from "./pages/AdminPortalPage";
import "./styles/app.css";
import HomePage from "./pages/HomePage";
import About from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ApplyForm from "./components/Courses/ApplyForm/ApplyForm";
import StudentList from "./components/Portal/AdminPortal/Students/StudentList";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import StudentDetail from "./components/Portal/AdminPortal/Students/StudentDetail";

function App() {
  return (
    <UserRoleProvider>
      <AdminRoleProvider>
        <Router>
          <Routes>
            <Route path="/admin" element={<AdminPortalPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/courses/*" element={<CoursesPage />} />
            <Route path="/applyform/*" element={<ApplyForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms-of-service" element={<TermsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/:studentId" element={<StudentDetail />} />
          </Routes>
        </Router>
      </AdminRoleProvider>
    </UserRoleProvider>
  );
}

export default App;
