import React, { forwardRef, useState } from "react";
import "../../../styles/applyform.css";
import { useLocation } from "react-router-dom";
import { createApplicant } from "../../../services/api";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Modal from "react-modal";

const ApplyForm = forwardRef(({ program: programProp }, ref) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const program = searchParams.get("program") || programProp;

  const [captchaValue, setCaptchaValue] = useState(null);
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentAddress, setParentAddress] = useState("");
  const [useParentInfo, setUseParentInfo] = useState(false);
  const [sameAsParentPhone, setSameAsParentPhone] = useState(false);
  const [sameAsParentAddress, setSameAsParentAddress] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCapthaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (captchaValue) {
      try {
        // Create an object with the form data
        const formData = {
          first_name: e.target.first_name.value,
          middle_name: e.target.middle_name.value,
          last_name: e.target.last_name.value,
          gender: e.target.gender.value,
          age: e.target.age.value,
          birthday: e.target.birthday.value,
          program_option: e.target.program_option.value,
          email_same_as_parent: useParentInfo,
          email: useParentInfo ? parentEmail : e.target.email.value,
          phone_number_same_as_parent: sameAsParentPhone,
          phone_number: sameAsParentPhone
            ? parentPhone
            : e.target.phone_number.value,
          address_same_as_parent: sameAsParentAddress,
          address_house_no: sameAsParentAddress
            ? parentAddress
            : e.target.address_house_no.value,
          address_street: e.target.address_street.value,
          address_barangay: e.target.address_barangay.value,
          address_city: e.target.address_city.value,
          address_state_province: e.target.address_state_province.value,
          address_postal_code: e.target.address_postal_code.value,
          parent: {
            // Include parent information from the form
            first_name: e.target.parent_first_name.value,
            middle_name: e.target.parent_middle_name.value,
            last_name: e.target.parent_last_name.value,
            email: parentEmail,
            address: parentAddress,
            primary_contact: parentPhone,
            // Include other parent fields as needed
          },
        };

        // Send the form data to the backend API
        const response = await axios.post("/api/applicants/", formData);

        // Handle the response
        if (response.status === 201) {
          setModalMessage("Form submitted successfully!");
          setIsModalOpen(true);
          // Reset the form or perform any other necessary actions
        } else {
          throw new Error("Failed to submit the form");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        setModalMessage("An error occurred. Please try again.");
        setIsModalOpen(true);
      }
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
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                />
                <text>Address Details:</text>
                <input
                  type="tel"
                  className="input-card parent-appform-input"
                  placeholder="Address Details"
                  value={parentAddress}
                  onChange={(e) => setParentAddress(e.target.value)}
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
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
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
                <select
                  className="input-card student-appform-input"
                  name="gender"
                >
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
                <input
                  type="text-course-form"
                  className="input-card student-appform-input"
                  placeholder="Program Option"
                  defaultValue={program}
                  disabled="true"
                  ref={ref}
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
                  disabled={useParentInfo || sameAsParentPhone}
                  value={useParentInfo || sameAsParentPhone ? parentPhone : ""}
                  onChange={(e) => setParentPhone(e.target.value)}
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
                  disabled={useParentInfo || sameAsParentAddress}
                  value={
                    useParentInfo || sameAsParentAddress ? parentAddress : ""
                  }
                  onChange={(e) => setParentAddress(e.target.value)}
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
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              onChange={handleCapthaChange}
            />
            <button type="submit" className="continue-appform-button">
              Continue
            </button>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Form Submission Message"
            >
              <h2>{modalMessage}</h2>
              <button onClick={closeModal}>Close</button>
            </Modal>
          </form>
        </div>
      </div>
    </form>
  );
});

export default ApplyForm;
