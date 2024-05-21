import React from "react";
import "../../../styles/course.css";

const SPEDCurriculum = () => {
  return (
    <section className="our-course-section">
      <div className="card-course-box">
        <h2 className="course-section-title">CURRICULUM</h2>
        <span className="course-section-text">
          LGMS will provide Certification
        </span>
        <div className="curriculum-grid">
          <div className="curriculum-item">
            <div className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
              </svg>
            </div>
            <span className="course-section-text">FULL T.E.A.C.H Program</span>
          </div>
          <div className="curriculum-item">
            <div className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
              </svg>
            </div>
            <span className="course-section-text">Partial Mainstreaming A</span>
          </div>
          <div className="curriculum-item">
            <div className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
              </svg>
            </div>
            <span className="course-section-text">SPED Support</span>
          </div>
          <div className="curriculum-item">
            <div className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
              </svg>
            </div>
            <span className="course-section-text">Partial Mainstreaming B</span>
          </div>
          <div className="curriculum-item">
            <div className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
              </svg>
            </div>
            <span className="course-section-text">Full Mainstreaming B</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SPEDCurriculum;
