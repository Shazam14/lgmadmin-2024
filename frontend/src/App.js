import React, { useState, useEffect } from "react";
import { UserRoleProvider } from "./contexts/UserRoleContext";
import { AdminRoleProvider } from "./contexts/AdminRoleContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { StudentProvider } from "./contexts/StudentContext";
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
import StudentPortalDashboard from "./components/Portal/StudentPortal/StudentPortalDashboard.js";
import ConfirmForm from "../src/components/Courses/ApplyForm/ConfirmForm";
import ProtectedRoute from "./components/auth/ProtectedRoute.js";
import LGMSChatbot from "./components/LGMSChatbot/LGMSChatbot.js";
import TeachersList from "./components/Portal/AdminPortal/Teachers/TeachersList.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/app.css";
import FamilyPortalDemo from "./components/Portal/FamilyPortal/FamilyPortalDemo.js";
import { PortalAuthProvider } from "./contexts/PortalAuthContext";
import PortalLogin from "./auth/PortalLogin.js";
import FamilyPortalSample from "./components/Portal/FamilyPortal/FamilyPortalSample.js";
import apiClientUpdate from "./services/apiClientUpdate.js";
import StudentPortalView from "./components/Portal/StudentPortal/StudentPortalView.js";
import AdminPortalView from "./components/Portal/AdminPortal/AdminPortalView.js";
function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userType: null,
    user: null,
    loading: true,
  });

  const checkAuthStatus = async () => {
    try {
      const response = await apiClientUpdate.get("auth-status/");
      setAuthState({
        isAuthenticated: response.data.isAuthenticated,
        userType: response.data.userType,
        user: response.data.user || null,
        loading: false,
      });
    } catch (error) {
      console.error("Auth status check failed:", error);
      setAuthState({
        isAuthenticated: false,
        userType: null,
        user: null,
        loading: false,
      });
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (authState.loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <PortalAuthProvider>
      <UserRoleProvider>
        <AdminRoleProvider>
          <StudentProvider>
            <Router>
              <Routes>
                {/* Public Routes - Keep as is */}
                <Route path="/" element={<HomePage />} />
                <Route path="about" element={<About />} />
                <Route path="terms-of-service" element={<TermsPage />} />
                <Route path="privacy-policy" element={<PrivacyPage />} />
                <Route path="courses/*" element={<CoursesPage />} />
                <Route path="chatbot/*" element={<LGMSChatbot />} />
                <Route path="apply-form" element={<ApplyForm />} />
                <Route path="/confirm" element={<ConfirmForm />} />

                {/* Authentication Routes */}
                <Route
                  path="/admin-login"
                  element={<AdminLogin setAuthState={setAuthState} />}
                />
                <Route
                  path="/portal-login"
                  element={<PortalLogin setAuthState={setAuthState} />}
                />

                {/* Protected Portal Routes */}
                <Route
                  path="/studentportal"
                  element={
                    <ProtectedRoute
                      authenticated={authState.isAuthenticated}
                      routeType="student"
                      userType={authState.userType}
                    >
                      <StudentPortalView />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<StudentPortalDashboard />} />
                  <Route path="lesson-plan" element={<Lessons />} />
                  <Route path="grades" element={<Grades />} />
                  <Route path="profile" element={<StudentDetail />} />
                </Route>

                <Route
                  path="/familyportal"
                  element={
                    <ProtectedRoute
                      authenticated={authState.isAuthenticated}
                      routeType="parent"
                      userType={authState.userType}
                    >
                      {" "}
                      <FamilyPortalSample />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<StudentPortalDashboard />} />
                  <Route path="lesson-plan" element={<Lessons />} />
                  <Route path="grades" element={<Grades />} />
                  <Route path="demo" element={<FamilyPortalDemo />} />
                  <Route
                    path="children/:studentId"
                    element={<StudentDetail />}
                  />
                </Route>

                {/* Protected Admin Routes - Keep as is */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute
                      authenticated={authState.isAuthenticated}
                      routeType="admin"
                      userType={authState.userType}
                    >
                      <AdminPortalView />
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

                {/* Remove the old fallback route and replace with proper error route */}
                <Route
                  path="*"
                  element={
                    <Navigate
                      to={authState.isAuthenticated ? "/" : "/portal-login"}
                      replace
                    />
                  }
                />
              </Routes>
            </Router>
          </StudentProvider>
        </AdminRoleProvider>
      </UserRoleProvider>
    </PortalAuthProvider>
  );
}

export default App;
