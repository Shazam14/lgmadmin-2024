import React, { useRef } from "react";
import NavigationHome from "../../Navbar/NavigationHome";
import HighSchoolHeroSection from "../HighSchool/HighSchooHeroSection";
import HighSchoolAdmission from "../HighSchool/HighSchoolAdmission";
import HighSchoolCurriculum from "../HighSchool/HighSchoolCurriculum";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";
import { handleApplyClick } from "../../../utils/applyFormUtils";

const HighSchool = () => {
  const program = "HighSchool";
  const formRef = useRef(null);

  return (
    <div>
      <NavigationHome />

      <HighSchoolHeroSection
        handleApplyClick={() => handleApplyClick(formRef)}
      />
      <HighSchoolAdmission />
      <HighSchoolCurriculum />
      <ApplyForm ref={formRef} program={program} />
      <Footer />
    </div>
  );
};

export default HighSchool;
