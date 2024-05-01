// CoursesPage.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import CASA from "../components/Courses/CASA/CASA";
import GradeSchool from "../components/Courses/GradeSchool/GradeSchool";
import HighSchool from "../components/Courses/HighSchool/HighSchool";
import SPED from "../components/Courses/SPED/SPED";
import HomeStudy from "../components/Courses/HomeStudy/HomeStudy";
// ... (other imports)

const CoursesPage = () => {
  return (
    <Routes>
      <Route path="/casa" element={<CASA />} />
      <Route path="/grade-school" element={<GradeSchool />} />
      <Route path="/highschool" element={<HighSchool />} />
      <Route path="/sped" element={<SPED />} />
      <Route path="/homestudy" element={<HomeStudy />} />

      {/* ... (other routes for courses) */}
    </Routes>
  );
};

export default CoursesPage;
