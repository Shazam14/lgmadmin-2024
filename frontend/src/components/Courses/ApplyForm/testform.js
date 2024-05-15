import React, { forwardRef, useState } from "react";
import "../../../styles/applyform.css";
import { useLocation } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import Modal from "react-modal";

const ApplyForm = forwardRef(({ program: programProp }, ref) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const program = searchParams.get("program") || programProp;

  const [captchaValue, setCaptchaValue] = useState(null);
  const [sameAsParentEmail, setSameAsParentEmail] = useState(false);
  const [sameAsParentPhone, setSameAsParentPhone] = useState(false);
  const [sameAsParentAddress, setSameAsParentAddress] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCapthaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaValue) {
      console.log("Form submitted");
      setModalMessage("Form submitted successfully!");
      setIsModalOpen(true);
    } else {
      console.log("Please complete the captcha");
      setModalMessage("Please complete the captcha.");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
      <div className="form-app-section">
        <h3 className="label">Applicant Student Information</h3>
        <div className="student-info-card">
          <text>Applicant First Name:</text>
          <input
            type="text-course-form"
            className="input-card student-appform-input"
            placeholder="Student First Name"
            name="first_name"
          />
          <text>Applicant Middle Name:</text>
          <input
            type="text-course-form"
            className="input-card student-appform-input"
            placeholder="Student Middle Name"
            name="middle_name"
          />
          <text>Student Last Name:</text>
          <input
            type="text-course-form"
            className="input-card student-appform-input"
            placeholder="Student Last Name"
            name="last_name"
          />
          <text>Gender:</text>
          <select className="input-card student-appform-input" name="gender">
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
          <text>Age:</text>
          <input
            type="number"
            className="input-card student-appform-input"
            placeholder="Age"
            name="age"
          />
          <text>Birthday:</text>
          <input
            type="date"
            className="input-card student-appform-input"
            placeholder="Birthday"
            name="birthday"
          />
          <text>Program Option:</text>
          <select
            className="input-card student-appform-input"
            name="program_option"
            defaultValue={program}
            ref={ref}
          >
            <option value="CASA">CASA</option>
            <option value="SPED">SPED</option>
            <option value="Highschool">Highschool</option>
            <option value="GradeSchool">GradeSchool</option>
            <option value="Homestudy">Homestudy</option>
          </select>
          <br />
          <input
            type="checkbox"
            checked={sameAsParentEmail}
            onChange={() => setSameAsParentEmail(!sameAsParentEmail)}
          />
          <span> Same as Parents Email address</span>
          <input
            type="email"
            className="input-card student-appform-input"
            placeholder="Student Email"
            disabled={sameAsParentEmail}
            name="email"
          />
          <br />
          <input
            type="checkbox"
            checked={sameAsParentPhone}
            onChange={() => setSameAsParentPhone(!sameAsParentPhone)}
          />
          <span> Same as Parents Phone Number</span>
          <input
            type="text-course-form"
            className="input-card student-appform-input"
            placeholder="Student Phone Number"
            disabled={sameAsParentPhone}
            name="phone_number"
          />
          <text>Address Details</text>
          <br />
          <input
            type="checkbox"
            checked={sameAsParentAddress}
            onChange={() => setSameAsParentAddress(!sameAsParentAddress)}
          />
          <span> Same as Parents Address</span>
          <input
            type="text-course-form"
            className="input-card student-appform-input"
            placeholder="House No."
            disabled={sameAsParentAddress}
            name="address_house_no"
          />
          <input
            type="text-course-form"
            className="input-card student-appform-input"
            placeholder="Street"
            disabled={sameAsParentAddress}
            name="address_street"
          />
          <input
            type="text-course-form"
            className="input-card student-appform-input"
            placeholder="Barangay"
            disabled={sameAsParentAddress}
            name="address_barangay"
          />
          <input
            type="text-course-form"
            className="input-card student-appform-input"
            placeholder="City"
            disabled={sameAsParentAddress}
            name="address_city"
          />
          <input
            type="text-course-form"
            className="input-card student-appform-input"
            placeholder="State/Province"
            disabled={sameAsParentAddress}
            name="address_state_province"
          />
          <input
            type="text-course-form"
            className="input-card student-appform-input"
            placeholder="Postal Code"
            disabled={sameAsParentAddress}
            name="address_postal_code"
          />
        </div>
      </div>
      {/* ... */}
    </form>
  );
});

export default ApplyForm;
