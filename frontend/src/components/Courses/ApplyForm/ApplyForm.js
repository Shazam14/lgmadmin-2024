import React, { forwardRef, useState, useRef } from "react";
import "../../../styles/applyform.css";
import { useLocation } from "react-router-dom";
import { Col, Container, Row, Stack, FormControl, Form } from "react-bootstrap";
import { createApplicant } from "./../../../services/studentApi";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Modal from "react-modal";

const ApplyForm = forwardRef(({ program: programProp, standalone }, ref) => {
  const formRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const program = searchParams.get("program") || programProp;
  const [selectedProgram, setSelectedProgram] = useState(program || "");

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
    <div>
      {standalone && <NavigationHome />}
      <Container>
        <Row>
          <div ref={ref} className="course-appform-container">
            <div className="course-appform card">
              <Stack direction="horizontal" gap={3}>
                <div className="form-header">
                  <div className="icon">
                    <svg className="icon" viewBox="0 0 512 512">
                      <path d="M45.63 79.75L52 81.25v58.5C45 143.9 40 151.3 40 160c0 8.375 4.625 15.38 11.12 19.75L35.5 242C33.75 248.9 37.63 256 43.13 256h41.75c5.5 0 9.375-7.125 7.625-13.1L76.88 179.8C83.38 175.4 88 168.4 88 160c0-8.75-5-16.12-12-20.25V87.13L128 99.63l.001 60.37c0 70.75 57.25 128 128 128s127.1-57.25 127.1-128L384 99.62l82.25-19.87c18.25-4.375 18.25-27 0-31.5l-190.4-46c-13-3-26.62-3-39.63 0l-190.6 46C27.5 52.63 27.5 75.38 45.63 79.75zM359.2 312.8l-103.2 103.2l-103.2-103.2c-69.93 22.3-120.8 87.2-120.8 164.5C32 496.5 47.53 512 66.67 512h378.7C464.5 512 480 496.5 480 477.3C480 400 429.1 335.1 359.2 312.8z"></path>
                    </svg>
                  </div>
                  <h2 className="display-6">LGMS Application Form</h2>
                </div>
              </Stack>
              <br />
              <Form onSubmit={handleSubmit}>
                {" "}
                <div className="form-app-section">
                  <h3 className="label">Parent's Information</h3>
                  <div className="parent-info-card">
                    <Form.Group controlId="formFirstName">
                      <Form.Label>First Name:</Form.Label>
                      <FormControl
                        type="text"
                        placeholder="Parent's First name"
                        className="input-card parent-appform-input"
                      />
                    </Form.Group>
                    <Form.Group controlId="formMiddleName">
                      <Form.Label>Middle Name:</Form.Label>
                      <FormControl
                        type="text"
                        placeholder="Parent's Middle name"
                        className="input-card parent-appform-input"
                      />
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                      <Form.Label>Last Name:</Form.Label>
                      <FormControl
                        type="text"
                        placeholder="Parent's Last name"
                        className="input-card parent-appform-input"
                      />
                    </Form.Group>

                    <Form.Group controlId="formEmailAddress">
                      <Form.Label>Email Address:</Form.Label>
                      <FormControl
                        type="email"
                        placeholder="email@parents.com"
                        className="input-card parent-appform-input"
                        onChange={(e) => setParentEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="formAddressDetails">
                      <Form.Label>Address Details:</Form.Label>
                      <Row>
                        <Col md={6}>
                          <FormControl
                            type="text"
                            placeholder="House Lot No."
                            className="input-card parent-appform-input"
                            value={parentAddress}
                            onChange={(e) => setParentAddress(e.target.value)}
                          />
                        </Col>
                        <Col>
                          <FormControl
                            type="text"
                            placeholder="Barangay address"
                            className="input-card parent-appform-input"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={7}>
                          <FormControl
                            type="text"
                            placeholder="City"
                            className="input-card parent-appform-input"
                          />
                        </Col>
                        <Col>
                          <FormControl
                            type="text"
                            placeholder="State/Province"
                            className="input-card parent-appform-input"
                          />
                        </Col>
                        <Col>
                          <FormControl
                            type="text"
                            placeholder="Postal Code"
                            className="input-card parent-appform-input"
                          />
                        </Col>
                      </Row>
                    </Form.Group>

                    <Form.Group controlId="formRelationshipToApplicant">
                      <Form.Label>Relationship to Applicant:</Form.Label>
                      <FormControl
                        type="text"
                        placeholder="Relationship to Applicant"
                        className="input-card parent-appform-input"
                      />
                    </Form.Group>

                    <Form.Group controlId="formContactPriority">
                      <Form.Label>Contact Priority:</Form.Label>
                      <FormControl
                        type="text"
                        placeholder="Contact Priority"
                        className="input-card parent-appform-input"
                      />
                    </Form.Group>

                    <Form.Group controlId="formPrimaryContact">
                      <Form.Label>Primary Contact:</Form.Label>
                      <FormControl
                        type="text"
                        placeholder="Primary Contact"
                        className="input-card parent-appform-input"
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formSecondaryContact">
                      <Form.Label>Secondary Contact:</Form.Label>
                      <FormControl
                        type="text"
                        placeholder="Primary Contact"
                        className="input-card parent-appform-input"
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="form-app-section">
                  <h3 className="label">Applicant Student Information</h3>
                  <div className="student-info-card">
                    <Form.Group controlId="applicantFirstName">
                      <Form.Label>Applicant First Name:</Form.Label>
                      <FormControl
                        type="text"
                        placeholder="Student First Name"
                        className="input-card student-appform-input"
                        name="first_name"
                      />
                    </Form.Group>

                    <Form.Group controlId="applicantMiddleName">
                      <Form.Label>Applicant Middle Name:</Form.Label>
                      <FormControl
                        type="text"
                        placeholder="Student Middle Name"
                        className="input-card student-appform-input"
                        name="middle_name"
                      />
                    </Form.Group>

                    <Form.Group controlId="studentLastName">
                      <Form.Label>Student Last Name:</Form.Label>
                      <FormControl
                        type="text"
                        placeholder="Student Last Name"
                        className="input-card student-appform-input"
                        name="last_name"
                      />
                    </Form.Group>

                    <Form.Group controlId="gender">
                      <Form.Label>Gender:</Form.Label>
                      <FormControl
                        as="select"
                        className="input-card student-appform-input"
                        name="gender"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                      </FormControl>
                    </Form.Group>

                    <Form.Group controlId="age">
                      <Form.Label>Age:</Form.Label>
                      <FormControl
                        type="number"
                        placeholder="Age"
                        className="input-card student-appform-input"
                        name="age"
                      />
                    </Form.Group>

                    <Form.Group controlId="birthday">
                      <Form.Label>Birthday:</Form.Label>
                      <FormControl
                        type="date"
                        className="input-card student-appform-input"
                        name="birthday"
                      />
                    </Form.Group>

                    <Form.Group controlId="programOption">
                      <Form.Label>Program Option:</Form.Label>
                      {program ? (
                        <FormControl
                          type="text"
                          placeholder="Program Option"
                          className="input-card student-appform-input"
                          defaultValue={program}
                          disabled
                          ref={ref}
                        />
                      ) : (
                        <FormControl
                          as="select"
                          className="input-card student-appform-input"
                          value={selectedProgram}
                          onChange={(e) => setSelectedProgram(e.target.value)}
                        >
                          <option value="">Select a program</option>
                          <option value="CASA">CASA</option>
                          <option value="Grade School">Grade School</option>
                          <option value="High School">Highschool</option>
                          <option value="SPED T.E.A.C.H.">SPED</option>
                          <option value="Homestudy">Homestudy</option>
                          {/* Add more program options as needed */}
                        </FormControl>
                      )}
                    </Form.Group>

                    <Form.Group controlId="sameAsParentsPhone">
                      <Form.Check
                        type="checkbox"
                        label="Same as Parents Phone Number"
                        checked={sameAsParentPhone}
                        onChange={() =>
                          setSameAsParentPhone(!sameAsParentPhone)
                        }
                      />
                      <FormControl
                        type="text"
                        placeholder="Student Phone Number"
                        className="input-card student-appform-input"
                        disabled={useParentInfo || sameAsParentPhone}
                        value={
                          useParentInfo || sameAsParentPhone ? parentPhone : ""
                        }
                        onChange={(e) => setParentPhone(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="addressDetails">
                      <Form.Label>Address Details:</Form.Label>
                      <Form.Check
                        type="checkbox"
                        label="Same as Parents Address"
                        checked={sameAsParentAddress}
                        onChange={() =>
                          setSameAsParentAddress(!sameAsParentAddress)
                        }
                      />
                      <Row>
                        <Col md={6}>
                          <FormControl
                            type="text"
                            placeholder="House No."
                            className="input-card student-appform-input"
                            disabled={useParentInfo || sameAsParentAddress}
                            value={
                              useParentInfo || sameAsParentAddress
                                ? parentAddress
                                : ""
                            }
                            onChange={(e) => setParentAddress(e.target.value)}
                          />
                        </Col>
                        <Col>
                          <FormControl
                            type="text"
                            placeholder="Street"
                            className="input-card student-appform-input"
                            disabled={sameAsParentAddress}
                            name="address_street"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={7}>
                          <FormControl
                            type="text"
                            placeholder="Barangay"
                            className="input-card student-appform-input"
                            disabled={sameAsParentAddress}
                            name="address_barangay"
                          />
                        </Col>
                        <Col>
                          <FormControl
                            type="text"
                            placeholder="City"
                            className="input-card student-appform-input"
                            disabled={sameAsParentAddress}
                            name="address_city"
                          />
                        </Col>
                        <Col>
                          <FormControl
                            type="text"
                            placeholder="State/Province"
                            className="input-card student-appform-input"
                            disabled={sameAsParentAddress}
                            name="address_state_province"
                          />
                        </Col>
                        <Col>
                          <FormControl
                            type="text"
                            placeholder="Postal Code"
                            className="input-card student-appform-input"
                            disabled={sameAsParentAddress}
                            name="address_postal_code"
                          />
                        </Col>
                      </Row>
                    </Form.Group>
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
              </Form>
            </div>
          </div>
        </Row>
      </Container>
      {standalone && <Footer />}
    </div>
  );
});

export default ApplyForm;
