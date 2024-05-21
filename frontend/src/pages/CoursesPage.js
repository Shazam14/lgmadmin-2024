// CoursesPage.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import CASA from "../components/Courses/CASA/CASA";
import GradeSchool from "../components/Courses/GradeSchool/GradeSchool";
import HighSchool from "../components/Courses/HighSchool/HighSchool";
import SPED from "../components/Courses/SPED/SPED";
import HomeStudy from "../components/Courses/HomeStudy/HomeStudy";
import ApplyForm from "../components/Courses/ApplyForm/ApplyForm";
// ... (other imports)

const CoursesPage = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Select a course option below.</div>} />
      <Route path="casa" element={<CASA />} />
      <Route path="grade-school" element={<GradeSchool />} />
      <Route path="highschool" element={<HighSchool />} />
      <Route path="sped" element={<SPED />} />
      <Route path="homestudy" element={<HomeStudy />} />
      <Route path="applyform" element={<ApplyForm />} />
      {/* You can add more routes here if needed */}
    </Routes>
  );
};

export default CoursesPage;
