// MainContent.js
import React from "react";
import HeroSection from "../HeroSection/HeroSection";
import TestimonialCarousel from "./TestimonialCarousel"; // Make sure this matches the exported name
import ImageCarousel from "./ImageCarousel";
import "./MainContent.css";

const MainContent = () => {
  return (
    <div className="homepage-content">
      <HeroSection />
      <ImageCarousel />
      <TestimonialCarousel /> {/* Updated to use TestimonialCarousel */}
      {/* User Portals and Announcements sections */}
    </div>
  );
};

export default MainContent;
