import React, { useState } from "react";
import "../../...styles/course.css";
import imageUrl from "./assets/sped-image.png";
import CoursesForm from "./CoursesForm";

const SPED = () => {
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);

  const toggleApplicationForm = () => {
    setIsApplicationFormOpen(!isApplicationFormOpen);
  };

  return (
    <div>
      <div className="image-container">
        <div className="image" style={{ backgroundImage: `url(${imageUrl})` }}>
          <div className="image-text">
            Discover our Special Education Program
          </div>
          <div className="image-subtext">
            Join us to explore unique learning opportunities!
          </div>
        </div>
        <div className="card">
          <div className="card-item">Latest Updates</div>
          <div className="card-item">Ongoing Enrollment</div>
          <div className="divider-vertical" />
          <div className="card-item">Enrollment starting at May 1, 2024</div>
          <div className="card-item">Until May 26, 2024</div>
          <div className="divider-vertical" />
          <div className="card-item">For School Year 2024 - 2025</div>
          <button className="apply-button" onClick={toggleApplicationForm}>
            Apply
          </button>
        </div>
      </div>
      <div className="program-description">
        <div className="title">Our Special Education Program</div>
        <div className="description-text">
          Training Exceptional Children life-long Abilities with Compassion and
          Hope Since LGMS started, the school began receiving inquiries from
          parents of children with ADD/ADHD and other developmental delays.
          Surprisingly, Therapy Centers and other schools with Special Education
          recommend LGMS as one of the best new environment for their
          clients/students to further develop their social and coping skills.
        </div>
      </div>
      {isApplicationFormOpen && <CoursesForm />}
    </div>
  );
};

export default SPED;
