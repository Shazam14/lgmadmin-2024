import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import CourseForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";
import SPEDHeroSection from "./SPEDHeroSection";
import SPEDAdmission from "./SPEDAdmission";
import SPEDCurriculum from "./SPEDCurriculum";

const SPED = () => {
  const [showCoursesForm, setShowCoursesForm] = useState(false);

  const handleApplyClick = () => {
    setShowCoursesForm(true);
  };

  return (
    <div>
      <Navbar />
      <SPEDHeroSection handleApplyClick={handleApplyClick} />
      <SPEDAdmission />
      <SPEDCurriculum />
      {/* Show the application form when the user clicks apply */}
      {showCoursesForm && (
        <CourseForm onClose={() => setShowCoursesForm(false)} />
      )}
      <Footer />
    </div>
  );
};

export default SPED;
