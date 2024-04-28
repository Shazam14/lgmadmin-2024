// CASA.js
import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import CASAHeroSection from "../../Courses/CASA/CASAHeroSection";
import CASACurriculum from "../../Courses/CASA/CASACurriculum";
import CASAAdmission from "../../Courses/CASA/CASAAdmission";
import CourseForm from "../CourseForm/CourseForm";
import Footer from "../../Footer/Footer";

const CASA = () => {
  const [showCoursesForm, setShowCoursesForm] = useState(false);

  const handleApplyClick = () => {
    setShowCoursesForm(true);
  };

  return (
    <div>
      <Navbar />
      <CASAHeroSection />
      <CASACurriculum />
      <CASAAdmission />

      <button onClick={handleApplyClick}>Apply Now</button>

      {/* Show the application form when the user clicks apply */}
      {showCoursesForm && (
        <CourseForm onClose={() => setShowCoursesForm(false)} />
      )}
      <Footer />
    </div>
  );
};

export default CASA;
