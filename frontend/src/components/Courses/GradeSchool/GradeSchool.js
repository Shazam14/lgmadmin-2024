import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import GradeSchoolHeroSection from "./GradeSchoolHeroSection";
import GradeSchoolAdmission from "./GradeSchoolAdmission";
import GradeSchoolCurriculum from "./GradeSchoolCurriculum";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";
const GradeSchool = () => {
  const program = "GradeSchool";
  const [showCoursesForm, setShowCoursesForm] = useState(false);

  const handleApplyClick = () => {
    setShowCoursesForm(true);
  };

  return (
    <div>
      <Navbar />
      <GradeSchoolHeroSection handleApplyClick={handleApplyClick} />
      <GradeSchoolAdmission />
      <GradeSchoolCurriculum />
      {showCoursesForm && (
        <ApplyForm onClose={() => setShowCoursesForm(false)} />
      )}
      <Footer />
    </div>
  );
};

export default GradeSchool;
