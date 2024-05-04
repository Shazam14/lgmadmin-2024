import React from "react";
import { UserRoleProvider } from "./contexts/UserRoleContext";
import { AdminRoleProvider } from "./contexts/AdminRoleContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPortalPage from "./pages/AdminPortalPage";
import StudentPage from "./pages/StudentPage";
import { AdminUIProvider } from "./contexts/AdminUIContext";
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
import Parents from "./components/Portal/AdminPortal/Parents/Parents";
import AdminDashboard from "./components/Portal/AdminPortal/Admin/AdminDashboard";
import Grades from "./components/Portal/AdminPortal/Grades/Grades";
import TuitionHistory from "./components/Portal/AdminPortal/TuitionHistory/TuitionHistory";
import CourseList from "./components/Portal/AdminPortal/Courses/CourseList";

function App() {
  return (
    <UserRoleProvider>
      <AdminRoleProvider>
        <AdminUIProvider>
          {" "}
          {/* Moved AdminUIProvider here */}
          <Router>
            <Routes>
              {/* URLS for public page of LGMS */}
              <Route path="/" element={<HomePage />} />
              <Route path="about" element={<About />} />
              <Route path="terms-of-service" element={<TermsPage />} />
              <Route path="privacy-policy" element={<PrivacyPage />} />
              {/* ends here*/}

              {/* URLS for admin page of LGMS */}
              {/* <Route element={<AdminPortalPage />}>
                <Route path="admin">
                  <Route index element={<AdminDashboard />} />
                </Route>
                <Route path="students" element={<StudentList />} />
                <Route path="students/:studentId" element={<StudentDetail />} />
                <Route path="students/parent-details" element={<Parents />} />
                <Route
                  path="students/emergency-contact"
                  element={<Parents />}
                />
                <Route path="students/courses" element={<CourseList />} />
                <Route path="students/grades" element={<Grades />} />
                <Route path="students/tuition" element={<TuitionHistory />} />
              </Route> */}
              {/* ends here*/}

              {/* URLS for admin page of LGMS */}
              <Route element={<AdminPortalPage />}>
                <Route path="admin">
                  <Route index element={<AdminDashboard />} />
                </Route>
                <Route path="students" element={<StudentList />} />
                <Route element={<StudentPage />}>
                  <Route path="students/:studentId">
                    <Route index element={<StudentDetail />} />
                    <Route path="parent-details" element={<Parents />} />
                    {/* <Route path="emergency-contact" element={<Parents />} /> */}
                    <Route path="courses" element={<CourseList />} />
                    <Route path="grades" element={<Grades />} />
                    <Route path="tuition" element={<TuitionHistory />} />
                  </Route>
                </Route>
              </Route>
              {/* ends here*/}
            </Routes>
          </Router>
        </AdminUIProvider>
      </AdminRoleProvider>
    </UserRoleProvider>
  );
}

export default App;
