// CASA.js
import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import CASAHeroSection from "../../Courses/CASA/CASAHeroSection";
import CASACurriculum from "../../Courses/CASA/CASACurriculum";
import CASAAdmission from "../../Courses/CASA/CASAAdmission";
import ApplyForm from "../ApplyForm/ApplyForm";
import Footer from "../../Footer/Footer";

const CASA = () => {
  const program = "CASA";
  const [showForm, setShowForm] = useState(false);

  const handleApplyClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };
  return (
    <div>
      <Navbar />
      <CASAHeroSection handleApplyClick={handleApplyClick} />
      <CASACurriculum />
      <CASAAdmission />
      {showForm && <ApplyForm onClose={handleCloseForm} />}

      <Footer />
    </div>
  );
};

export default CASA;
