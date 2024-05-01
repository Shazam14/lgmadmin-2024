// GSHeroSection.js
import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/course.css";
import genericImage from "../../../assets/images/courses_img/generic.png";

const SPEDHeroSection = ({ handleApplyClick }) => {
  const program = "SPED";
  return (
    <>
      <section className="course-hero-section">
        <div
          className="course-image-container"
          style={{ backgroundImage: `url(${genericImage})` }}
        >
          <h1 className="course-discover-text">
            Discover our Special Education Program
          </h1>
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
            Our Special Education Program
          </h2>
          <p className="course-section-text">
            Training Exceptional Children life-long Abilities with Compassion
            and Hope Since LGMS started, the school began receiving inquiries
            from parents of children with ADD/ADHD and other developmental
            delays. Surprisingly, Therapy Centers and other schools with Special
            Education recommend LGMS as one of the best new environment for
            their clients/ students to further develop their social and coping
            skills.
          </p>
        </div>
      </section>
    </>
  );
};

export default SPEDHeroSection;
