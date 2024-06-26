import React from "react";
import "../../../styles/course.css";

const SPEDAdmission = () => {
  return (
    <section className="our-course-section">
      <div className="card-course-box">
        <h2 className="course-section-title">Admission Requirements</h2>
        <p className="course-section-text">
          We welcome applications from students who would benefit from our
          specialized education program. To apply, please review the admission
          requirements and deadlines below:
        </p>
        <div className="requirements-list">
          <ol>Application Form (duly filled up)</ol>
          <ol>
            {" "}
            Documents
            <li>Original PSA </li>
          </ol>
          <span>1. Latest Birth Certificate</span>
          <span>2. Latest Baptismal Certificate</span>
          <span>3. Latest Report Card or Equivalent</span>
        </div>
      </div>
    </section>
  );
};

export default SPEDAdmission;
