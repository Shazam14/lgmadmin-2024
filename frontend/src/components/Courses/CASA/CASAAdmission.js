import React from "react";
import "../../../styles/course.css";

const CASAAdmission = () => {
  return (
    <section className="our-casa-section">
      <div className="card-casa-box">
        <h2 className="section-title">Admission</h2>
        <p className="section-text">
          We welcome applications from students who would benefit from our
          specialized education program. To apply, please review the admission
          requirements and deadlines below:
        </p>
        <div className="requirements-list">
          <span>1. Latest Birth Certificate</span>
          <span>2. Latest Baptismal Certificate</span>
          <span>3. Latest Report Card or Equivalent</span>
        </div>
      </div>
    </section>
  );
};

export default CASAAdmission;
