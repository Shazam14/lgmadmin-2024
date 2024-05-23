import React, { useRef } from "react";
import NavigationHome from "../../Navbar/NavigationHome";
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
      <NavigationHome />
      <GradeSchoolHeroSection handleApplyClick={handleApplyClick} />
      <GradeSchoolAdmission />
      <GradeSchoolCurriculum />
      <ApplyForm ref={formRef} program={program} />
      <Footer />
    </div>
  );
};

export default GradeSchool;
