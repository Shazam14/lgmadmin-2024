import React, { useState, useRef, useEffect } from "react";
import "../../../styles/applyform.css";
import { useLocation } from "react-router-dom";
import { Container, Row, Stack, Form, ProgressBar } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import NavigationHome from "../../Navbar/NavigationHome";
import Footer from "../../Footer/Footer";
import apiClient from "../../../services/apiClient";
import ApplicantForm from "./ApplicantForm";
import ParentForm from "./ParentForm";
import Confirm from "./ConfirmForm";
import SuccessForm from "./SuccessForm";
import Modal from "react-modal";

const ApplyForm = React.forwardRef(
  ({ program: programProp, standalone }, ref) => {
    const formRef = useRef(null);
    const birthdayRef = useRef(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const program = searchParams.get("program") || programProp;
    const [selectedProgram, setSelectedProgram] = useState(program || "");
    const [programs, setPrograms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
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
    const [parentId, setParentId] = useState(null);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // State for success modal

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

      if (model === "applicant" && field === "program_option") {
        console.log("Selected Program:", value);
      }

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

    const handleNextStep = async (e) => {
      e.preventDefault();
      console.log("Form Data on Submit:", formData); // Debugging form data before submission
      console.log("Current Step:", currentStep);
      console.log("CAPTCHA Value:", captchaValue);
      
      try {
        if (currentStep === 1 && validateParent()) {
          console.log("Attempting to submit parent data...");
          setIsLoading(true);
          const response = await apiClient.post("parents/", formData.parent);
          if (response.status === 201) {
            setParentId(response.data.id);
            setCurrentStep(currentStep + 1);
          } else {
            throw new Error("Parent creation failed");
          }
          setIsLoading(false);
        } else if (currentStep === 2 && validateApplicant()) {
          console.log("Attempting to validate applicant data...");
          setIsLoading(true);
          // Add the parent ID to the applicant data, ensure program_option is included
          const applicantData = {
            ...formData.applicant,
            parent: parentId,
            program_option: formData.applicant.program_option,
          };

          const applicantValidationResponse = await apiClient.post(
            "applicants/validate_applicant/",
            applicantData
          );
          if (applicantValidationResponse.status !== 200) {
            throw new Error("Applicant validation failed");
          }

          console.log("Attempting to create applicant...");

          const applicantResponse = await apiClient.post(
            "applicants/create_applicant/",
            {
              applicant: applicantData,
              parent: formData.parent, //will remove this formData.parent here..
            }
          );

          console.log("Submission Response:", applicantResponse);
          if (applicantResponse.status === 201) {
            setCurrentStep(currentStep + 1); // Move to confirmation step
            let simulatedProgress = 0;
            const progressInterval = setInterval(() => {
              simulatedProgress += 10;
              setProgress(simulatedProgress);
              if (simulatedProgress >= 100) {
                clearInterval(progressInterval);
                setIsLoading(false);
                setIsSuccessModalOpen(true); // Open success modal
              }
            }, 500);
          } else {
            throw new Error("Failed to submit the form");
          }
        } else if (currentStep === 3) {
          setIsSuccessModalOpen(true); // Open success modal
        } else {
          alert("Please fill in all required fields.");
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        alert("An error occurred. Please try again.");
        setIsLoading(false);
      }
    };

    const handlePreviousStep = () => {
      setCurrentStep(currentStep - 1);
    };

    Modal.setAppElement("#root");

    const handleModalClose = () => {
      setIsSuccessModalOpen(false);
      window.location.reload(); // Refresh the current page
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
                {isLoading && (
                  <ProgressBar now={progress} label={`${progress}%`} animated />
                )}
                <Form onSubmit={handleNextStep} ref={ref}>
                  {currentStep === 1 && (
                    <ParentForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                    />
                  )}
                  {currentStep === 2 && (
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
                  {currentStep === 3 && <Confirm formData={formData} />}
                  <div className="form-navigation-buttons">
                    {currentStep > 1 && currentStep < 3 && (
                      <button type="button" onClick={handlePreviousStep} className="buttons-apply-form">
                        Previous
                      </button>
                    )}
                    {currentStep < 3 && (
                      <button type="button" onClick={handleNextStep} className="buttons-apply-form float-right">
                        Next
                      </button>
                    )}
                    {currentStep === 3 && (
                      <button type="button" onClick={handleNextStep} className="buttons-apply-form float-right">
                        Submit
                      </button>
                    )}
                  </div>
                </Form>
              </div>
            </div>
          </Row>
        </Container>
        {standalone && <Footer />}
        <SuccessForm isOpen={isSuccessModalOpen} onClose={handleModalClose} />
      </div>
    );
  }
);

export default ApplyForm;
