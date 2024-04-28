import React from "react";
import "../../styles/homepage.css";
import NavbarText from "./NavbarText";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="home-navbar">
      <div className="left-section">
        <NavbarText>Home</NavbarText>
        <div className="chatbot-text-navbar">Chatbot</div>
        <div className="dropdown">
          <button className="dropdown-btn">
            <NavbarText>Courses</NavbarText>
          </button>
          <div className="dropdown-content">
            {/* Add dropdown menu items here */}
            <Link to="/courses/casa">CASA</Link>
            <Link to="/courses/grade-school">Grade School</Link>
            {/* ... */}
          </div>
        </div>
        <NavbarText>About</NavbarText>
        <NavbarText>Contact Us</NavbarText>
        <NavbarText>Enroll</NavbarText>
        <NavbarText>Apply</NavbarText>
      </div>
      <div className="right-section">
        <div className="dropdown">
          <button className="dropdown">
            <NavbarText>LGMS Portal</NavbarText>
          </button>
          <div className="dropdown-content">
            <Link to="/courses/casa">CASA</Link>
            <Link to="/courses/grade-school">Grade School</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
