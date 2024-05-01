import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import HighSchoolHeroSection from "../HighSchool/HighSchooHeroSection";
import HighSchoolAdmission from "../HighSchool/HighSchoolAdmission";
import HighSchoolCurriculum from "../HighSchool/HighSchoolCurriculum";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";

const GradeSchool = () => {
  const program = "highschool";
  const [showCoursesForm, setShowCoursesForm] = useState(false);

  const handleApplyClick = () => {
    setShowCoursesForm(true);
  };

  return (
    <div>
      <Navbar />
      <HighSchoolHeroSection handleApplyClick={handleApplyClick} />
      <HighSchoolAdmission />
      <HighSchoolCurriculum />
      <button onClick={handleApplyClick}>Apply Now</button>

      {showCoursesForm && (
        <ApplyForm onClose={() => setShowCoursesForm(false)} />
      )}
      <Footer />
    </div>
  );
};

export default GradeSchool;
