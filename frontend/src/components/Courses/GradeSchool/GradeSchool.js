import React, { useRef } from "react";
import Navbar from "../../Navbar/Navbar";
import GradeSchoolHeroSection from "./GradeSchoolHeroSection";
import GradeSchoolAdmission from "./GradeSchoolAdmission";
import GradeSchoolCurriculum from "./GradeSchoolCurriculum";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";
const GradeSchool = () => {
  const program = "GradeSchool";
  const formRef = useRef(null);

  const handleApplyClick = () => {
    if (formRef.current) {
      formRef.current.focus(); // This assumes you have implemented a focus method in your ApplyForm component
    }
  };

  return (
    <div>
      <Navbar />
      <GradeSchoolHeroSection handleApplyClick={handleApplyClick} />
      <GradeSchoolAdmission />
      <GradeSchoolCurriculum />
      <ApplyForm ref={formRef} program={program} />
      <Footer />
    </div>
  );
};

export default GradeSchool;
