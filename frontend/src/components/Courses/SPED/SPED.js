import React, { useRef } from "react";
import NavigationHome from "../../Navbar/NavigationHome";
import Footer from "../../Footer/Footer";
import SPEDHeroSection from "./SPEDHeroSection";
import SPEDAdmission from "./SPEDAdmission";
import SPEDCurriculum from "./SPEDCurriculum";
import ApplyForm from "../ApplyForm/ApplyForm";
import { handleApplyClick } from "../../../utils/applyFormUtils";

const SPED = () => {
  const program = "SPED Teach";
  const formRef = useRef(null);

  return (
    <div>
      <NavigationHome />
      <SPEDHeroSection handleApplyClick={() => handleApplyClick(formRef)} />
      <SPEDAdmission />
      <SPEDCurriculum />
      <ApplyForm ref={formRef} program={program} />
      <Footer />
    </div>
  );
};

export default SPED;
