// GSHeroSection.js
import React from "react";
import "../../../styles/course.css";
import genericImage from "../../../assets/images/courses_img/generic.png";
import { Container } from "react-bootstrap";
const HomeStudyHeroSection = ({ handleApplyClick }) => {
  const program = "HomeStudy";
  return (
    <>
      <Container fluid style={{ padding: "4rem 0" }}>
        <section className="course-hero-section">
          <div
            className="course-image-container"
            style={{ backgroundImage: `url(${genericImage})` }}
          >
            <h1 className="course-discover-text">Discover Homestudy Program</h1>
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
            <h2 className="course-section-title">
              Our Homestudy Class Program
            </h2>
            <p className="course-section-text">[brief desc]</p>
          </div>
        </section>
      </Container>
    </>
  );
};

export default HomeStudyHeroSection;
