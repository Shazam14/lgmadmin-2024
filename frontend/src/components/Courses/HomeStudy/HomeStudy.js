import React, { useRef } from "react";
import NavigationHome from "../../Navbar/NavigationHome";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";
import HomeStudyHeroSection from "./HomeStudyHeroSection";
import HomeStudyAdmission from "./HomeStudyAdmission";
import HomeStudyCurriculum from "./HomeStudyCurriculum";
import { handleApplyClick } from "../../../utils/applyFormUtils";
const HomeStudy = () => {
  const program = "HomeStudy";
  const formRef = useRef(null);

  return (
    <div>
      <NavigationHome />
      <HomeStudyHeroSection
        handleApplyClick={() => handleApplyClick(formRef)}
      />
      <HomeStudyAdmission />
      <HomeStudyCurriculum />
      <ApplyForm ref={formRef} program={program} />
      <Footer />
    </div>
  );
};

export default HomeStudy;
