import React from "react";
import "../../../styles/homepage.css";
import logoImage from "../../../assets/images/logos/lgms-hero-section.png";

const SchoolLogo = () => {
  return (
    <div className="school-logo">
      <img src={logoImage} alt="School Logo" className="school-logo-image" />
    </div>
  );
};

export default SchoolLogo;
