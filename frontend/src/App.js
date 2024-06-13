import React, { useState, useEffect } from "react";
import { UserRoleProvider } from "./contexts/UserRoleContext";
import { AdminRoleProvider } from "./contexts/AdminRoleContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudentProvider } from "./contexts/StudentContext";
import AdminPortalPage from "./pages/AdminPortalPage";
import AdminLogin from "./auth/AdminLogin.js";
import StudentPage from "./pages/StudentPage";
import HomePage from "./pages/HomePage";
import About from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import CourseList from "./components/Portal/AdminPortal/Courses/CourseList";
import SchedulePage from "./components/Portal/AdminPortal/Schedules/SchedulePage";
import ApplicantList from "./components/Portal/AdminPortal/Applicants/ApplicantList.js";
import EnrollmentList from "./components/Portal/AdminPortal/Enrollments/EnrollmentList.js";
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
import StudentPortalPage from "./pages/StudentPortalPage";
import StudentPortalDashboard from "./components/Portal/StudentPortal/StudentPortalDashboard.js";
import ConfirmForm from "../src/components/Courses/ApplyForm/ConfirmForm";
import ProtectedRoute from "./components/auth/ProtectedRoute.js";
import BotpressChat from "./components/Botpress/BotpressChat.js";
import apiClient from "./services/apiClient.js";
import TeachersList from "./components/Portal/AdminPortal/Teachers/TeachersList.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/app.css";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const response = await apiClient.get("auth-status/");
      setAuthenticated(response.data.isAuthenticated);
    } catch (error) {
      console.error("Auth status check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
              <Route path="chatbot/*" element={<BotpressChat />} />
              <Route path="apply-form" element={<ApplyForm />} />
              <Route path="/confirm" element={<ConfirmForm />} />

              <Route path="/studentportal" element={<StudentPortalPage />}>
                <Route index element={<StudentPortalDashboard />} />
                <Route path="lesson-plan" element={<Lessons />} />
              </Route>

              <Route path="/familyportal" element={<StudentPortalPage />}>
                <Route index element={<StudentPortalDashboard />} />
                <Route path="lesson-plan" element={<Lessons />} />
              </Route>

              <Route
                path="/admin-login"
                element={<AdminLogin setAuthenticated={setAuthenticated} />}
              />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute authenticated={authenticated}>
                    <AdminPortalPage />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="grades" element={<Grades />} />
                <Route path="courses" element={<CourseList />} />
                <Route path="schedules" element={<SchedulePage />} />
                <Route path="lesson-plan" element={<Lessons />} />
                <Route path="enrollments" element={<EnrollmentList />} />
                <Route path="applicants" element={<ApplicantList />} />
                <Route path="teachers" element={<TeachersList />} />
                <Route path="students" element={<StudentList />} />
                <Route path="students/:studentId" element={<StudentPage />}>
                  <Route index element={<StudentDetail />} />
                  <Route path="parent-info" element={<Parents />} />
                  <Route path="emergency-contact" element={<Emergency />} />
                  <Route path="grades" element={<Grades />} />
                  <Route path="tuition" element={<TuitionHistory />} />
                </Route>
              </Route>

              {!authenticated && (
                <Route
                  path="/admin"
                  element={<AdminLogin setAuthenticated={setAuthenticated} />}
                />
              )}
            </Routes>
          </Router>
        </StudentProvider>
      </AdminRoleProvider>
    </UserRoleProvider>
  );
}

export default App;
