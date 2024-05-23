import React from "react";
import NavigationHome from "../components/Navbar/NavigationHome";
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";
import WhoWeAre from "../components/About/WhoWeAre";
import MissionVision from "../components/About/MissionVision";

const Admin = () => {
  return (
    <div>
      <NavigationHome />
      <About />
      <WhoWeAre />
      <MissionVision />
      <Footer />
    </div>
  );
};

export default Admin;
