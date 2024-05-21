import React, { useRef } from "react";
import Navbar from "../../Navbar/Navbar";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";
import HomeStudyHeroSection from "./HomeStudyHeroSection";
import HomeStudyAdmission from "./HomeStudyAdmission";
import HomeStudyCurriculum from "./HomeStudyCurriculum";

const HomeStudy = () => {
  const program = "HomeStudy";
  const formRef = useRef(null);

  const handleApplyClick = () => {
    if (formRef.current) {
      formRef.current.focus(); // This assumes you have implemented a focus method in your ApplyForm component
    }
  };

  return (
    <div>
      <Navbar />
      <HomeStudyHeroSection handleApplyClick={handleApplyClick} />
      <HomeStudyAdmission />
      <HomeStudyCurriculum />
      <ApplyForm ref={formRef} program={program} />
      <Footer />
    </div>
  );
};

export default HomeStudy;
