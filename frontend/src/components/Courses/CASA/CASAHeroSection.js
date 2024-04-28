// CASAHeroSection.js
import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/course.css";
import genericImage from "../../../assets/images/courses_img/generic.png";

const CASAHeroSection = () => {
  const program = "CASA";
  return (
    <>
      <section className="casa-hero-section">
        <div
          className="image-container"
          style={{ backgroundImage: `url(${genericImage})` }}
        >
          <h1 className="discover-text">Discover CASA Program</h1>
          <p className="join-us-text">
            Join us to explore unique learning opportunities!
          </p>
        </div>
        <div className="card-casa">
          <div className="info-with-divider">
            <div className="text-group">
              <span className="text-casa">Latest Updates</span>
              <span className="text-casa-small">Ongoing Enrollment</span>
            </div>
            <div className="divider-vertical"></div>
            <div className="text-group">
              <span className="text-casa">Enrollment starting at</span>
              <span className="text-casa-small">May 1, 2024</span>
            </div>
            <div className="divider-vertical"></div>
            <div className="text-group">
              <span className="text-casa">Until</span>
              <span className="text-casa-small">May 30, 2024</span>
            </div>
            <div className="divider-vertical"></div>
            <div className="text-group">
              <span className="text-casa">For School Year</span>
              <span className="text-casa-small">2024 - 2025</span>
            </div>
          </div>
          <Link to={`/course-form?program=${program}`} className="apply-button">
            Apply
          </Link>
        </div>
      </section>

      <section className="our-casa-program">
        <div className="card-casa-box">
          <h2 className="section-title">Our CASA Program</h2>
          <p className="section-text">
            CASA is based on our commitment to five-year agreement. From 2.5 to
            6 years old. It provides a prepared environment where children are
            free to respond to their natural tendency to work. The children's
            inherent love of learning is encouraged by giving them opportunities
            to engage in spontaneous, meaningful activities under the guidance
            of a trained adult. Through their work, the children develop
            concentration, motivation, persistence, and discipline. Within this
            framework of order, the children progress at their own pace and
            rhythm according to their individual capabilities.
          </p>
        </div>
      </section>
    </>
  );
};

export default CASAHeroSection;
