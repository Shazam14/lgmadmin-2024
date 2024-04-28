// In ./pages/Home.js
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/Homepage/HeroSection/HeroSection";
import ImageCarousel from "../components/Homepage/ImageCarousel/ImageCarousel";
import TestimonialCarousel from "../components/Homepage/TestimonialCarousel/TestimonialCarousel";
import OnlineServices from "../components/Homepage/OnlineServices/OnlineServices";
import Announcement from "../components/Homepage/Announcement/Announcement";
import Footer from "../components/Footer/Footer";
import "../styles/homepage.css";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ImageCarousel />
      <TestimonialCarousel />
      <OnlineServices />
      <Announcement />
      <Footer />
    </div>
  );
};

export default HomePage;
