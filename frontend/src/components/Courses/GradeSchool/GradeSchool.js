import React, { useRef } from "react";
import NavigationHome from "../../Navbar/NavigationHome";
import GradeSchoolHeroSection from "./GradeSchoolHeroSection";
import GradeSchoolAdmission from "./GradeSchoolAdmission";
import GradeSchoolCurriculum from "./GradeSchoolCurriculum";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";

import { handleApplyClick } from "../../../utils/applyFormUtils";

const GradeSchool = () => {
  const program = "GradeSchool";
  const formRef = useRef(null);

  return (
    <div>
      <NavigationHome />
      <GradeSchoolHeroSection
        handleApplyClick={() => handleApplyClick(formRef)}
      />
      <GradeSchoolAdmission />
      <GradeSchoolCurriculum />
      <ApplyForm ref={formRef} program={program} />
      <Footer />
    </div>
  );
};

export default GradeSchool;
