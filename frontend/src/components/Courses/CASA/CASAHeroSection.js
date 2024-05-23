// CASAHeroSection.js
import React from "react";
import "../../../styles/course.css";
import genericImage from "../../../assets/images/courses_img/generic.png";
import { Container } from "react-bootstrap";

const CASAHeroSection = ({ handleApplyClick }) => {
  const program = "CASA";

  return (
    <>
      <Container fluid style={{ padding: "4rem 0" }}>
        <section className="course-hero-section">
          <div
            className="course-image-container"
            style={{ backgroundImage: `url(${genericImage})` }}
          >
            <h1 className="course-discover-text">Discover CASA Program</h1>
            <p className="course-join-us-text">
              Join us to explore unique learning opportunities!
            </p>
          </div>
          <div className="course-card">
            <div className="info-with-divider">
              <div className="text-group">
                <span className="text-course">Latest Updates</span>
                <span className="text-course-small">Ongoing Enrollment</span>
              </div>
              <div className="divider-vertical"></div>
              <div className="text-group">
                <span className="text-course">Enrollment starting at</span>
                <span className="text-course-small">May 1, 2024</span>
              </div>
              <div className="divider-vertical"></div>
              <div className="text-group">
                <span className="text-course">Until</span>
                <span className="text-course-small">May 30, 2024</span>
              </div>
              <div className="divider-vertical"></div>
              <div className="text-group">
                <span className="text-course">For School Year</span>
                <span className="text-course-small">2024 - 2025</span>
              </div>
              <div>
                <button onClick={handleApplyClick} className="apply-button">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="our-course-program">
          <div className="card-course-box">
            <h2 className="course-section-title">Our CASA Program</h2>
            <p className="course-section-text">
              CASA is based on our commitment to five-year agreement. From 2.5
              to 6 years old. It provides a prepared environment where children
              are free to respond to their natural tendency to work. The
              children's inherent love of learning is encouraged by giving them
              opportunities to engage in spontaneous, meaningful activities
              under the guidance of a trained adult. Through their work, the
              children develop concentration, motivation, persistence, and
              discipline. Within this framework of order, the children progress
              at their own pace and rhythm according to their individual
              capabilities.
            </p>
          </div>
        </section>
      </Container>
    </>
  );
};

export default CASAHeroSection;
