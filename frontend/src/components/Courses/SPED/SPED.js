import React, { useRef } from "react";
import NavigationHome from "../../Navbar/NavigationHome";
import CourseForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";
import SPEDHeroSection from "./SPEDHeroSection";
import SPEDAdmission from "./SPEDAdmission";
import SPEDCurriculum from "./SPEDCurriculum";
import ApplyForm from "../ApplyForm/ApplyForm";

const SPED = () => {
  const program = "SPED Teach";
  const formRef = useRef(null);

  const handleApplyClick = () => {
    if (formRef.current) {
      formRef.current.focus(); // This assumes you have implemented a focus method in your ApplyForm component
    }
  };

  return (
    <div>
      <NavigationHome />
      <SPEDHeroSection handleApplyClick={handleApplyClick} />
      <SPEDAdmission />
      <SPEDCurriculum />
      <ApplyForm ref={formRef} program={program} />
      <Footer />
    </div>
  );
};

export default SPED;
