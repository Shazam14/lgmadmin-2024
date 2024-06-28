import React from "react";
import "../../styles/about.css";
import schoolLogo from "../../assets/images/about_img/schoollogo.png";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <Container fluid style={{ padding: "4rem 0 2rem 0" }}>
      <div className="about-us-section">
        <div
          className="about-school-logo-image"
          style={{ backgroundImage: `url(${schoolLogo})` }}
        />
      </div>
      <div className="about-text-container">
        <h2 className="about-text-header">
          <span className="font-bold">L</span>earning{" "}
          <span className="font-bold">G</span>arden{" "}
          <span className="font-bold">M</span>ontessori
          <span className="font-bold">S</span>chool
        </h2>
        <h3 className="about-us-text">About Us</h3>
        <p className="about-text-description">
          LGMS was duly recognized by the Department of Education in 2003 for
          our Casa course, in 2006 for the complete elementary course, in 2011
          for our SPED Program, and in 2013 for the complete Secondary High
          School.
        </p>
      </div>
    </Container>
  );
};
export default About;
