import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";
import HomeStudyHeroSection from "./HomeStudyHeroSection";
import HomeStudyAdmission from "./HomeStudyAdmission";
import HomeStudyCurriculum from "./HomeStudyCurriculum";

const HomeStudy = () => {
  const [showCoursesForm, setShowCoursesForm] = useState(false);

  const handleApplyClick = () => {
    setShowCoursesForm(true);
  };

  return (
    <div>
      <Navbar />
      <HomeStudyHeroSection handleApplyClick={handleApplyClick} />
      <HomeStudyAdmission />
      <HomeStudyCurriculum />
      {showCoursesForm && (
        <ApplyForm onClose={() => setShowCoursesForm(false)} />
      )}
      <Footer />
    </div>
  );
};

export default HomeStudy;
