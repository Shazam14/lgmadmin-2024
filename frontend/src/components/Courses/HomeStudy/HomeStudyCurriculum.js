import React from "react";
import "../../../styles/course.css";
import { Card } from "react-bootstrap";

const HomeStudyCurriculum = () => {
  return (
    <section className="our-course-section">
      <div className="card-course-box">
        <h2 className="course-section-title">CURRICULUM</h2>
        <span className="course-section-text">
          LGMS will provide Certification
        </span>
        <div className="curriculum-grid">
          <div className="curriculum-item">
            <Card.Body>
              <div className="d-flex align-items-start mb-2">
                <div className="icon me-2">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                  </svg>
                </div>
                <div>
                  <Card.Title className="course-section-text mb-0">
                    Certificate for Sensory
                  </Card.Title>
                </div>
              </div>
            </Card.Body>
          </div>
          <div className="curriculum-item">
            <Card.Body>
              <div className="d-flex align-items-start mb-2">
                <div className="icon me-2">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                  </svg>
                </div>
                <div>
                  <Card.Title className="course-section-text mb-0">
                    Mathematics
                  </Card.Title>
                </div>
              </div>
            </Card.Body>
          </div>
          <div className="curriculum-item">
            <Card.Body>
              <div className="d-flex align-items-start mb-2">
                <div className="icon me-2">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                  </svg>
                </div>
                <div>
                  <Card.Title className="course-section-text mb-0">
                    Practical Application
                  </Card.Title>
                </div>
              </div>
            </Card.Body>
          </div>
          <div className="curriculum-item">
            <Card.Body>
              <div className="d-flex align-items-start mb-2">
                <div className="icon me-2">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                  </svg>
                </div>
                <div>
                  <Card.Title className="course-section-text mb-0">
                    Sensory Achievement
                  </Card.Title>
                </div>
              </div>
            </Card.Body>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeStudyCurriculum;
