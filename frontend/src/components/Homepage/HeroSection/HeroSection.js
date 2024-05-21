import React from "react";
import WebsiteUpdatesText from "./WebsiteUpdatesText";
import ChatbotText from "./ChatbotText";
import DescriptionText from "./DescriptionText";
import SchoolLogo from "./SchoolLogo";
import "../../../styles/homepage.css";
import SchoolLogoText from "./SchoolLogoText";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="chatbot-prompt">
        <WebsiteUpdatesText />
        <ChatbotText />
        <DescriptionText />
      </div>
      <div className="school-logo-container">
        <SchoolLogoText />
        <SchoolLogo />
      </div>
    </div>
  );
};

export default HeroSection;
