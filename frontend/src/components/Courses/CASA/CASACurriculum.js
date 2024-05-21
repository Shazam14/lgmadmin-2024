import React from "react";
import "../../../styles/course.css";
import { Typography } from "@mui/material";

const CASACurriculum = () => {
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
            <span className="course-section-text">Practical Life</span>
            <p>
              exercises build the children’s natural interest and help them
              develop good work habits, concentration, eye-hand coordination, a
              lengthened attention span, and control of their bodies.
            </p>
          </div>
          <div className="curriculum-item">
            <div className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
              </svg>
            </div>
            <span className="course-section-text">Sensorial Materials</span>
            <Typography>
              are designed to help the children develop their abilities to make
              judgments, compare, and discriminate based on size, shape, weight,
              texture, color, and temperature; store up impressions in their
              muscular memory and develop the use of certain muscles and
              motions.
            </Typography>
          </div>
          <div className="curriculum-item">
            <div className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
              </svg>
            </div>
            <span className="course-section-text">Sensorial Materials</span>
          </div>
          <div className="curriculum-item">
            <div className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
              </svg>
            </div>
            <span className="course-section-text">Botany</span>
          </div>
          <div className="curriculum-item">
            <div className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
              </svg>
            </div>
            <span className="course-section-text">Language</span>
          </div>
          <div className="curriculum-item">
            <div className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
              </svg>
            </div>
            <span className="course-section-text">Zoology</span>
          </div>
          <div className="curriculum-item">
            <div className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
              </svg>
            </div>
            <span className="course-section-text">Art</span>
          </div>
          <div className="curriculum-item">
            <div className="icon">
              <svg viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
              </svg>
            </div>
            <span className="course-section-text">Music</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CASACurriculum;
