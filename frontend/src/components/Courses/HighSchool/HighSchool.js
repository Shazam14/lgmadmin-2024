import React, { useRef } from "react";
import NavigationHome from "../../Navbar/NavigationHome";
import HighSchoolHeroSection from "../HighSchool/HighSchooHeroSection";
import HighSchoolAdmission from "../HighSchool/HighSchoolAdmission";
import HighSchoolCurriculum from "../HighSchool/HighSchoolCurriculum";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";

const HighSchool = () => {
  const program = "HighSchool";
  const formRef = useRef(null);

  const handleApplyClick = () => {
    if (formRef.current) {
      formRef.current.focus(); // This assumes you have implemented a focus method in your ApplyForm component
    }
  };

  return (
    <div>
      <NavigationHome />
      <HighSchoolHeroSection handleApplyClick={handleApplyClick} />
      <HighSchoolAdmission />
      <HighSchoolCurriculum />
      <ApplyForm ref={formRef} program={program} />
      <Footer />
    </div>
  );
};

export default HighSchool;
