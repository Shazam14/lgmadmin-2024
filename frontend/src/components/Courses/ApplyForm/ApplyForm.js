import React, { useState, useRef, useEffect } from "react";
import "../../../styles/applyform.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Stack, Form } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import NavigationHome from "../../Navbar/NavigationHome";
import Footer from "../../Footer/Footer";
import apiClient from "../../../services/apiClient";
import ApplicantForm from "./ApplicantForm";
import ParentForm from "./ParentForm";
import Confirm from "./ConfirmForm";
import Success from "./SuccessForm";

const ApplyForm = React.forwardRef(
  ({ program: programProp, standalone }, ref) => {
    const formRef = useRef(null);
    const birthdayRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const program = searchParams.get("program") || programProp;
    const [selectedProgram, setSelectedProgram] = useState(program || "");
    const [programs, setPrograms] = useState([]);
    const [programMapping, setProgramMapping] = useState({});
    const [captchaValue, setCaptchaValue] = useState(null);
    const [formData, setFormData] = useState({
      parent: {
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        street_address: "",
        city: "",
        state_province: "",
        relationship: "Mother",
        primary_contact_value: "",
        primary_contact_type: "Phone",
        secondary_contact_value: "",
        secondary_contact_type: "Phone",
        contact_priority: "Primary",
      },
      applicant: {
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "Female",
        age: "",
        birthday: "",
        program_option: program,
        email: "",
        phone_number: "",
        address_house_no: "",
        address_street: "",
        address_barangay: "",
        address_city: "",
        address_state_province: "",
        address_postal_code: "",
      },
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [birthMonth, setBirthMonth] = useState("");
    const [birthDay, setBirthDay] = useState("");

    useEffect(() => {
      const fetchPrograms = async () => {
        try {
          const response = await apiClient.get("grades/programs/");
          setPrograms(response.data);
          const mapping = {};
          response.data.forEach((program) => {
            mapping[program.name] = program.id;
          });
          setProgramMapping(mapping);
          console.log("Program Mapping:", mapping);
        } catch (error) {
          console.error("Error fetching programs:", error);
        }
      };

      fetchPrograms();
    }, []);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      const [model, field] = name.split(".");
      if (!formData[model]) {
        console.error(`Invalid model: ${model}`);
        return;
      }
      setFormData((prevData) => ({
        ...prevData,
        [model]: {
          ...prevData[model],
          [field]: value,
        },
      }));
    };

    const handleAgeChange = (e) => {
      const age = parseInt(e.target.value);
      setFormData((prevData) => ({
        ...prevData,
        applicant: {
          ...prevData.applicant,
          age: age,
        },
      }));
      updateBirthday(age, birthMonth, birthDay);
    };

    const handleBirthMonthChange = (e) => {
      const selectedBirthMonth = parseInt(e.target.value);
      setBirthMonth(selectedBirthMonth);
      updateBirthday(formData.applicant.age, selectedBirthMonth, birthDay);
    };

    const handleBirthDayChange = (e) => {
      const selectedBirthDay = parseInt(e.target.value);
      setBirthDay(selectedBirthDay);
      updateBirthday(formData.applicant.age, birthMonth, selectedBirthDay);
    };

    const updateBirthday = (age, month, day) => {
      if (age && month && day) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();

        let birthYear = currentYear - age;
        if (
          month > currentMonth ||
          (month === currentMonth && day > currentDay)
        ) {
          birthYear--;
        }

        const birthday = `${birthYear}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        setFormData((prevData) => ({
          ...prevData,
          applicant: {
            ...prevData.applicant,
            birthday: birthday,
          },
        }));
      }
    };

    const handleCaptchaChange = (value) => {
      setCaptchaValue(value);
    };

    const validateApplicant = () => {
      const requiredFields = [
        "applicant.first_name",
        "applicant.last_name",
        "applicant.age",
        "applicant.program_option",
      ];
      const missingFields = requiredFields.filter((field) => {
        const [model, name] = field.split(".");
        return !formData[model][name];
      });
      return missingFields.length === 0;
    };

    const validateParent = () => {
      const requiredFields = [
        "parent.first_name",
        "parent.last_name",
        "parent.email",
        "parent.phone_number",
      ];
      const missingFields = requiredFields.filter((field) => {
        const [model, name] = field.split(".");
        return !formData[model][name];
      });
      return missingFields.length === 0;
    };

    const handleNextStep = async () => {
      if (currentStep === 1 && validateApplicant()) {
        try {
          const response = await apiClient.post(
            "applicants/validate_applicant/",
            formData.applicant
          );
          if (response.status === 200) {
            setCurrentStep(currentStep + 1);
          } else {
            throw new Error("Applicant verification failed");
          }
        } catch (error) {
          console.error("Error verifying applicant:", error);
          alert(
            "Applicant verification failed. Please check the fields and try again."
          );
        }
      } else if (currentStep === 2 && validateParent()) {
        try {
          const response = await apiClient.post(
            "parents/validate_parent/",
            formData.parent
          );
          if (response.status === 200) {
            setCurrentStep(currentStep + 1);
          } else {
            throw new Error("Parent verification failed");
          }
        } catch (error) {
          console.error("Error verifying parent:", error);
          alert(
            "Parent verification failed. Please check the fields and try again."
          );
        }
      } else if (currentStep === 3) {
        handleSubmit(); // Call handleSubmit directly if on the last step
      } else {
        alert("Please fill in all required fields.");
      }
    };

    const handlePreviousStep = () => {
      setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Form Data on Submit:", formData); // Debugging form data before submission
      console.log("Current Step:", currentStep);
      console.log("CAPTCHA Value:", captchaValue);

      try {
        console.log("Attempting to submit the form...");

        // Validate and create parent first
        const parentValidationResponse = await apiClient.post(
          "parents/validate_parent/",
          formData.parent
        );
        if (parentValidationResponse.status !== 200) {
          throw new Error("Parent validation failed");
        }

        const parentResponse = await apiClient.post(
          "parents/",
          formData.parent
        );
        if (parentResponse.status !== 201) {
          throw new Error("Parent creation failed");
        }

        const parentId = parentResponse.data.id;

        // Add the parent ID to the applicant data, ensure program_option is included
        const applicantData = {
          ...formData.applicant,
          parent: parentId,
          program_option: formData.applicant.program_option,
        };

        // Validate and create applicant
        const applicantValidationResponse = await apiClient.post(
          "applicants/validate_applicant/",
          applicantData
        );
        if (applicantValidationResponse.status !== 200) {
          throw new Error("Applicant validation failed");
        }

        const applicantResponse = await apiClient.post(
          "applicants/create_applicant/",
          {
            applicant: applicantData,
            parent: formData.parent,
          }
        );

        console.log("Submission Response:", applicantResponse);
        if (applicantResponse.status === 201) {
          setCurrentStep(4); // Move to success step
        } else {
          throw new Error("Failed to submit the form");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        alert("An error occurred. Please try again.");
      }
    };

    return (
      <div>
        {standalone && <NavigationHome />}
        <Container>
          <Row>
            <div className="course-appform-container">
              <div className="course-appform card">
                <Stack direction="horizontal" gap={3}>
                  <div className="form-header">
                    <h2 className="display-6">LGMS Application Form</h2>
                  </div>
                </Stack>
                <br />
                <Form onSubmit={handleSubmit} ref={ref}>
                  {currentStep === 1 && (
                    <ApplicantForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                      handleAgeChange={handleAgeChange}
                      birthdayRef={birthdayRef}
                      birthMonth={birthMonth}
                      handleBirthMonthChange={handleBirthMonthChange}
                      birthDay={birthDay}
                      handleBirthDayChange={handleBirthDayChange}
                      programs={programs}
                    />
                  )}
                  {currentStep === 2 && (
                    <ParentForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                    />
                  )}
                  {currentStep === 3 && <Confirm formData={formData} />}
                  {currentStep === 4 && <Success />}
                  <div className="form-navigation-buttons">
                    {currentStep > 1 && currentStep < 4 && (
                      <button type="button" onClick={handlePreviousStep}>
                        Previous
                      </button>
                    )}
                    {currentStep < 3 && (
                      <button type="button" onClick={handleNextStep}>
                        Next
                      </button>
                    )}
                    {currentStep === 3 && <button type="submit">Submit</button>}
                  </div>
                </Form>
              </div>
            </div>
          </Row>
        </Container>
        {standalone && <Footer />}
      </div>
    );
  }
);

export default ApplyForm;
