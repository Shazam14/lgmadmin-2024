// CASA.js
import React, { useRef } from "react";
import NavigationHome from "../../Navbar/NavigationHome";
import CASAHeroSection from "../../Courses/CASA/CASAHeroSection";
import CASACurriculum from "../../Courses/CASA/CASACurriculum";
import CASAAdmission from "../../Courses/CASA/CASAAdmission";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";
import { handleApplyClick } from "../../../utils/applyFormUtils";

const CASA = () => {
  const program = "CASA";
  const formRef = useRef(null);

  return (
    <div>
      <NavigationHome />
      <CASAHeroSection
        handleApplyClick={() => handleApplyClick(formRef)}
      />
      <CASACurriculum />
      <CASAAdmission />
      <ApplyForm ref={formRef} program={program} />
      <Footer />
    </div>
  );
};

export default CASA;
