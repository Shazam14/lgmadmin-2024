import React, { useRef, useState, useEffect } from "react"; 
import "../../styles/homepage.css"; 
import { makeStyles } from "@mui/material";"
import NavbarText from "./NavbarText"; 
import { Link } from "react-router-dom"; 
import React, { useRef, useState, useEffect } from "react";
import "../../styles/homepage.css";
import NavbarText from "./NavbarText";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const coursesDropdownRef = useRef(null); // Reference for the courses dropdown
  const [isPortalDropdownOpen, setIsPortalDropdownOpen] = useState(false);
  const portalDropdownRef = useRef(null); // Reference for the portal dropdown

  // Function to close the dropdowns if a click is detected outside of them
  const handleClickOutside = (event) => {
    if (
      coursesDropdownRef.current &&
      !coursesDropdownRef.current.contains(event.target)
    ) {
      setIsCoursesDropdownOpen(false);
    }
    if (
      portalDropdownRef.current &&
      !portalDropdownRef.current.contains(event.target)
    ) {
      setIsPortalDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="home-navbar" aria-label="Main navigation">
      <div className="left-section">
        <NavbarText>
          <Link to="/">Home</Link>
        </NavbarText>
        <div className="chatbot-text-navbar">
          <Link to="/chatbot">Chatbot</Link>
        </div>
        <div className="dropdown" ref={coursesDropdownRef}>
          <button
            onClick={() => setIsCoursesDropdownOpen(!isCoursesDropdownOpen)}
            className="dropdown-btn"
            aria-haspopup="true"
            aria-expanded={isCoursesDropdownOpen}
          >
            <NavbarText>Courses</NavbarText>
          </button>
          <div
            className={`dropdown-content ${
              isCoursesDropdownOpen ? "show" : ""
            }`}
            role="menu"
          >
            <Link
              to="/courses/casa"
              tabIndex={isCoursesDropdownOpen ? "0" : "-1"}
              role="menuitem"
            >
              CASA
            </Link>
            <Link
              to="/courses/grade-school"
              tabIndex={isCoursesDropdownOpen ? "0" : "-1"}
              role="menuitem"
            >
              Grade School
            </Link>
            <Link
              to="/courses/highschool"
              tabIndex={isCoursesDropdownOpen ? "0" : "-1"}
              role="menuitem"
            >
              High School
            </Link>
            <Link
              to="/courses/sped"
              tabIndex={isCoursesDropdownOpen ? "0" : "-1"}
              role="menuitem"
            >
              SPED
            </Link>
            <Link
              to="/courses/homestudy"
              tabIndex={isCoursesDropdownOpen ? "0" : "-1"}
              role="menuitem"
            >
              HomeStudy{" "}
            </Link>
            {/* ... */}
          </div>
        </div>
        <NavbarText>
          {" "}
          <Link to="/about">About</Link>
        </NavbarText>
        <NavbarText>
          {" "}
          <Link to="/contact">Contact</Link>
        </NavbarText>
        <NavbarText>
          <Link to="/enroll">Apply</Link>
        </NavbarText>
        <NavbarText>
          <Link to="/apply">Enroll</Link>
        </NavbarText>
      </div>
      <div className="right-section">
        <div className="dropdown" ref={portalDropdownRef}>
          <button className="dropdown">
            <button
              onClick={() => setIsPortalDropdownOpen(!isPortalDropdownOpen)}
              className="dropdown-btn"
              aria-haspopup="true"
              aria-expanded={isPortalDropdownOpen}
            >
              <NavbarText>LGMS Portal</NavbarText>
            </button>
          </button>
          <div
            className={`dropdown-content ${
              isCoursesDropdownOpen ? "show" : ""
            }`}
            role="menu"
          >
            <Link
              to="/portal/student"
              tabIndex={isPortalDropdownOpen ? "0" : "-1"}
              role="menuitem"
            >
              Student
            </Link>
            <Link
              to="/portal/teacher"
              tabIndex={isPortalDropdownOpen ? "0" : "-1"}
              role="menuitem"
            >
              Teacher
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
