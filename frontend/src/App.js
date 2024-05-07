import React from "react";
import { UserRoleProvider } from "./contexts/UserRoleContext";
import { AdminRoleProvider } from "./contexts/AdminRoleContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudentProvider } from "./contexts/StudentContext";
import AdminPortalPage from "./pages/AdminPortalPage";
import StudentPage from "./pages/StudentPage";
import "./styles/app.css";
import HomePage from "./pages/HomePage";
import About from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import CourseList from "./components/Portal/AdminPortal/Courses/CourseList";
import SchedulePage from "./components/Portal/AdminPortal/Schedules/SchedulePage";
import ApplicantList from "./components/Portal/AdminPortal/Applicants/ApplicantList.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ApplyForm from "./components/Courses/ApplyForm/ApplyForm";
import StudentList from "./components/Portal/AdminPortal/Students/StudentList";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import StudentDetail from "./components/Portal/AdminPortal/Students/StudentDetail";
import Parents from "./components/Portal/AdminPortal/Parents/Parents";
import AdminDashboard from "./components/Portal/AdminPortal/Admin/AdminDashboard";
import Grades from "./components/Portal/AdminPortal/Grades/Grades";
import TuitionHistory from "./components/Portal/AdminPortal/TuitionHistory/TuitionHistory";
import Emergency from "./components/Portal/AdminPortal/Emergency/Emergency";
import Lessons from "./components/Portal/AdminPortal/Lessons/Lessons.js";
import StudentPortal from "./components/Portal/StudentPortal/StudentPortal.js";

function App() {
  return (
    <UserRoleProvider>
      <AdminRoleProvider>
        <StudentProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="about" element={<About />} />
              <Route path="terms-of-service" element={<TermsPage />} />
              <Route path="privacy-policy" element={<PrivacyPage />} />
              <Route path="courses/*" element={<CoursesPage />} />
              <Route path="apply-form" element={<ApplyForm />} />

              <Route path="/admin" element={<AdminPortalPage />}>
                <Route index element={<AdminDashboard />} />
                <Route path="grades" element={<Grades />} />
                <Route path="courses" element={<CourseList />} />
                <Route path="schedules" element={<SchedulePage />} />
                <Route path="lesson-plan" element={<Lessons />} />
                <Route path="applicants" element={<ApplicantList />} />
                <Route path="student-portal" element={<StudentPortal />} />
                <Route path="students" element={<StudentList />} />
                <Route path="students/:studentId" element={<StudentPage />}>
                  <Route index element={<StudentDetail />} />
                  <Route path="parent-info" element={<Parents />} />
                  <Route path="emergency-contact" element={<Emergency />} />
                  <Route path="grades" element={<Grades />} />
                  <Route path="tuition" element={<TuitionHistory />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </StudentProvider>
      </AdminRoleProvider>
    </UserRoleProvider>
  );
}

export default App;
