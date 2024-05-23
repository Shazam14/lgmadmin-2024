import React, { useState } from "react";
import { useLocation, navigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import SuccessForm from "./SuccessForm";

const ConfirmForm = () => {
  const location = useLocation();
  const { formData } = location.state;
  const [captchaValue, setCaptchaValue] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleFinalSubmit = () => {
    if (captchaValue) {
      // Process final submission here
      console.log("Submitting data:", formData);
      // Possibly send this data to a server or handle it as needed
    } else {
      console.log("Please complete the captcha");
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleEdit = () => {
    navigate("/apply-form", { state: { formData } });
  };

  return (
    <div>
      <h2>Please confirm your details before submitting</h2>
      <div>
        <h3>Parent Information</h3>
        <p>Parent's Name: {formData.parentName}</p>
        <p>Parent's Email: {formData.parentEmail}</p>
        <p>Parent's Phone: {formData.parentPhone}</p>
        <p>Address: {formData.address}</p>
        <p>Relationship to applicant: {formData.relationshipToApplicant}</p>
        <p>
          Contact Priority:
          <br />
          Emergency contact
        </p>
        <p>
          Primary contact #: {formData.primaryContact}
          <br />
          Secondary contact #: {formData.secondaryContact}
        </p>
      </div>
      <div>
        <h3>Student Information</h3>
        <p>Applicant Full Name: {formData.applicantFullName}</p>
        <p>Gender: {formData.gender}</p>
        <p>
          Age: {formData.age}
          <br />
          Birthday: {formData.birthday}
        </p>
        <p>Program option: {formData.programOption}</p>
        <p>Email Address: {formData.applicantEmail}</p>
        <p>Phone number: {formData.applicantPhone}</p>
        <p>Address: {formData.applicantAddress}</p>
      </div>
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        onChange={handleCaptchaChange}
      />
      <button onClick={handleFinalSubmit}>Submit</button>
      <button onClick={handleEdit}>Edit</button>
      <SuccessForm isOpen={showSuccessModal} onClose={closeSuccessModal} />
    </div>
  );
};

export default ConfirmForm;
