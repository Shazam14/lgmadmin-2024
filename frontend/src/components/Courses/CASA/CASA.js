// CASA.js
import React, { useRef, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import CASAHeroSection from "../../Courses/CASA/CASAHeroSection";
import CASACurriculum from "../../Courses/CASA/CASACurriculum";
import CASAAdmission from "../../Courses/CASA/CASAAdmission";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";

const CASA = () => {
  const program = "CASA";
  const formRef = useRef(null);

  const handleApplyClick = () => {
    if (formRef.current) {
      formRef.current.focus(); // This assumes you have implemented a focus method in your ApplyForm component
    }
  };

  return (
    <div>
      <Navbar />
      <CASAHeroSection handleApplyClick={handleApplyClick} />
      <CASACurriculum />
      <CASAAdmission />
      <ApplyForm ref={formRef} program={program} />

      <Footer />
    </div>
  );
};

export default CASA;
