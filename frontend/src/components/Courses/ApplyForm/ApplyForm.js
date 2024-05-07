import React from "react";
import "../../../styles/applyform.css";
import { useLocation } from "react-router-dom";

const ApplyForm = ({ program: programProp, onClose }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const program = searchParams.get("program") || programProp;

  return (
    <div className="course-appform-container">
      <div className="course-appform card">
        <div className="form-header">
          <div className="icon">
            <svg className="icon" viewBox="0 0 512 512">
              <path d="M45.63 79.75L52 81.25v58.5C45 143.9 40 151.3 40 160c0 8.375 4.625 15.38 11.12 19.75L35.5 242C33.75 248.9 37.63 256 43.13 256h41.75c5.5 0 9.375-7.125 7.625-13.1L76.88 179.8C83.38 175.4 88 168.4 88 160c0-8.75-5-16.12-12-20.25V87.13L128 99.63l.001 60.37c0 70.75 57.25 128 128 128s127.1-57.25 127.1-128L384 99.62l82.25-19.87c18.25-4.375 18.25-27 0-31.5l-190.4-46c-13-3-26.62-3-39.63 0l-190.6 46C27.5 52.63 27.5 75.38 45.63 79.75zM359.2 312.8l-103.2 103.2l-103.2-103.2c-69.93 22.3-120.8 87.2-120.8 164.5C32 496.5 47.53 512 66.67 512h378.7C464.5 512 480 496.5 480 477.3C480 400 429.1 335.1 359.2 312.8z"></path>
            </svg>
          </div>
          <h2 className="section-title text">LGMS Application Form</h2>
        </div>
        <form>
          <div className="form-app-section">
            <h3 className="label">Parent's Information</h3>
            <div className="parent-info-card">
              <text>First Name:</text>
              <input
                type="text-course-form"
                className="input-card parent-appform-input"
                placeholder="Parent's First Name"
              />
              <text>Middle Name:</text>
              <input
                type="text-course-form"
                className="input-card parent-appform-input"
                placeholder="Parent's Middle Name"
              />
              <text>Last Name:</text>
              <input
                type="text-course-form"
                className="input-card parent-appform-input"
                placeholder="Parent's Last Name"
              />
              <text>Email address:</text>
              <input
                type="email"
                className="input-card parent-appform-input"
                placeholder="Parent's Email Address"
              />
              <text>Address Details:</text>
              <input
                type="tel"
                className="input-card parent-appform-input"
                placeholder="Address Details"
              />
              <text>Barangay:</text>
              <input
                type="text"
                className="input-card parent-appform-input"
                placeholder="Barangay"
              />
              <text>City:</text>
              <input
                type="text"
                className="input-card parent-appform-input"
                placeholder="City"
              />
              <text>State/Province:</text>
              <input
                type="text"
                className="input-card parent-appform-input"
                placeholder="State/Province"
              />
              <text>Postal Code:</text>
              <input
                type="text"
                className="input-card parent-appform-input"
                placeholder="Postal Code"
              />
              <text>Relationship to Applicant:</text>
              <input
                type="text"
                className="input-card parent-appform-input"
                placeholder="Relationship to Applicant"
              />
              <text>Contact Priority:</text>
              <input
                type="text"
                className="input-card parent-appform-input"
                placeholder="Contact Priority"
              />
              <text>Primary Contact:</text>
              <input
                type="text"
                className="input-card parent-appform-input"
                placeholder="Primary Contact"
              />
              <text>Secondary Contact:</text>
              <input
                type="text"
                className="input-card parent-appform-input"
                placeholder="Primary Contact"
              />
            </div>
          </div>
          <div className="form-app-section">
            <h3 className="label">Applicant Student Information</h3>
            <div className="student-info-card">
              <text>Applicant First Name:</text>
              <input
                type="text-course-form"
                className="input-card student-appform-input"
                placeholder="Student First Name"
              />
              <text>Applicant Middle Name:</text>
              <input
                type="text-course-form"
                className="input-card student-appform-input"
                placeholder="Student Middle Name"
              />
              <text>Student Last Name:</text>
              <input
                type="text-course-form"
                className="input-card student-appform-input"
                placeho
                lder="Student Last Name"
              />
              <text>Gender:</text>
              <input
                type="text-course-form"
                className="input-card student-appform-input"
                placeholder="Gender"
              />
              <text>Age:</text>
              <input
                type="text-course-form"
                className="input-card student-appform-input"
                placeholder="Age"
              />
              <text>Birthday:</text>
              <input
                type="text-course-form"
                className="input-card student-appform-input"
                placeholder="Age"
              />
              <text>Program Option:</text>
              <input
                type="text-course-form"
                className="input-card student-appform-input"
                placeholder="Program Option"
              />
              <text>Email Address:</text>
              <input
                type="text-course-form"
                className="input-card student-appform-input"
                placeholder="checkbox if same as Parents"
              />
              <text>Phone Number</text>
              <input
                type="text-course-form"
                className="input-card student-appform-input"
                placeholder="checkbox if same as Parents"
              />
              <text>Notes/Message</text>
              <input
                type="text-course-form"
                className="input-card student-appform-input"
                placeholder="checkbox if same as Parents"
              />
              <text>Notes/Message</text>
              <input
                type="text-course-form"
                className="input-card student-appform-input"
                placeholder="Notes/Message"
              />
            </div>
          </div>
          <button type="submit" className="continue-appform-button">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
