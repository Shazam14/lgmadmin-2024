import React, { useState } from "react";
import "../../../styles/course.css";
import { useLocation } from "react-router-dom";

const CourseForm = ({ program: programProp }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const program = searchParams.get("program") || programProp;

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleApplyClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="course-form-container">
      <button className="apply-button" onClick={handleApplyClick}>
        Apply
      </button>
      {isFormVisible && (
        <div className="course-form card">
          <div className="form-header">
            <span className="icon-course">📝</span>{" "}
            {/* Replace with actual icon element */}
            <h2 className="section-title text">Application Form</h2>
          </div>
          <form>
            <div className="form-section parent-info-card">
              <h3 className="section-subtitle">Parent's Information</h3>
              <input
                type="text-course-form"
                className="input-card"
                placeholder="Parent's Name"
              />
              <input
                type="email"
                className="input-card"
                placeholder="Parent's Email"
              />
              <input
                type="tel"
                className="input-card"
                placeholder="Parent's Phone"
              />
              <input
                type="text"
                className="input-card"
                placeholder="Parent's Address"
              />
            </div>
            <div className="form-section student-info-card">
              <h3 className="section-subtitle">Student Information</h3>
              <input
                type="text-course-form"
                className="input-card"
                placeholder="First Name"
              />
              <input
                type="text-course-form"
                className="input-card"
                placeholder="Middle Name"
              />
              <input
                type="text-course-form"
                className="input-card"
                placeholder="Last Name"
              />
              <input
                type="text-course-form"
                className="input-card"
                placeholder="Program Option"
              />
              <input
                ttype="text-course-form"
                className="input-card"
                placeholder="Age"
              />
            </div>
            <button type="submit" className="continue-button">
              Continue
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CourseForm;
