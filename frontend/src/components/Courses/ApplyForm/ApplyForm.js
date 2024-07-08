import React, { useState, useRef, useEffect, useCallback } from "react";
import "../../../styles/applyform.css";
import { useLocation } from "react-router-dom";
import { Container, Row, Stack, Form, ProgressBar, Spinner } from "react-bootstrap";
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
    const [loadingMessage, setLoadingMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [programMapping, setProgramMapping] = useState({});
    const [captchaValue, setCaptchaValue] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
      parent: {
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        primary_contact_value: "",
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
    // const [birthMonth, setBirthMonth] = useState("");
    // const [birthDay, setBirthDay] = useState("");
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

    const handleInputChange = useCallback((e) => {
      const { name, value } = e.target;
      const [model, field] = name.split(".");

      if (model === "applicant" && field === "program_option") {
        console.log("Selected Program:", value);
      }

      setFormData((prevData) => {
        if (!prevData[model]) {
          console.error(`Invalid model: ${model}`);
          return prevData; // Return previous state unchanged if model is invalid
        }

        return {
          ...prevData,
          [model]: {
            ...prevData[model],
            [field]: value,
          },
        };
      });
    }, []);

    const handleAgeChange = useCallback((e) => {
      const age = parseInt(e.target.value);
      setFormData((prevData) => ({
        ...prevData,
        applicant: {
          ...prevData.applicant,
          age: age,
        },
      }));
    }, []);

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


    const concatenateAreaCode = useCallback(() => {
      setFormData(prevData => {
        const updatedData = { ...prevData };
        const phonePrefix = "+63";

        if (updatedData.parent.primary_contact_value) {
          // Only add the prefix if it's not already there
          updatedData.parent.primary_contact_value = updatedData.parent.primary_contact_value.startsWith(phonePrefix)
            ? updatedData.parent.primary_contact_value
            : phonePrefix + updatedData.parent.primary_contact_value;
        }
        if (updatedData.parent.phone_number) {
          // Only add the prefix if it's not already there
          updatedData.parent.phone_number = updatedData.parent.phone_number.startsWith(phonePrefix)
            ? updatedData.parent.phone_number
            : phonePrefix + updatedData.parent.phone_number;
        }

        return updatedData;
      });
    }, []);

    const simulateProgress = useCallback(() => {
      let simulatedProgress = 0;
      const progressInterval = setInterval(() => {
        simulatedProgress += 10;
        setProgress(simulatedProgress);
        if (simulatedProgress >= 100) {
          clearInterval(progressInterval);
          setIsLoading(false);
          setIsSuccessModalOpen(true);
        }
      }, 500);
    }, []);

    const handleNextStep = useCallback(async (e) => {
      e.preventDefault();

      try {
        if (currentStep === 1) {
          setIsLoading(true);
          setProgress(0);
          setLoadingMessage("Submitting Parent/ Guardian Information");
          simulateProgress();
          concatenateAreaCode();
          await new Promise(resolve => setTimeout(resolve, 0));
          const response = await apiClient.post("parents/", formData.parent);
          console.log("full response", response);
          if (response.status === 201) {
            setParentId(response.data.id);
            setCurrentStep(prev => prev + 1);
          } else {
            throw new Error("Unexpected response status: " + response.status);
          }
          setIsLoading(false);
        } else if (currentStep === 2) {
          setIsLoading(true);
          setProgress(0);
          setLoadingMessage("Submitting applicant Information......");
          simulateProgress();
          const applicantData = {
            ...formData.applicant,
            parent: parentId,
            program_option: formData.applicant.program_option,
          };

          const applicantValidationResponse = await apiClient.post("applicants/validate_applicant/", applicantData);
          if (applicantValidationResponse.status !== 200) {
            throw new Error("Applicant validation failed");
          }

          const applicantResponse = await apiClient.post("applicants/create_applicant/", {
            applicant: applicantData,
            parent: formData.parent,
          });

          if (applicantResponse.status === 201) {
            setCurrentStep(prev => prev + 1);
            simulateProgress();
          } else {
            throw new Error("Failed to submit the form");
          }
        } else if (currentStep === 3) {
          setIsLoading(true);
          setProgress(0);
          setLoadingMessage("Finalising submission....");
          simulateProgress();
          await new Promise(resolve => setTimeout(resolve, 1000));
          setIsSuccessModalOpen(true);
        }
      } catch (error) {
        console.error("Error submitting the form:", error.response?.data || error.message);
        console.error("Error response:", error.response);
        console.error("Error data:", error.response?.data);
        console.error("Error status:", error.response?.status);
        setErrors(error.response?.data || {});
        alert("An error occurred. Please check your inputs.");
      }
      finally {
        setIsLoading(false);
        setLoadingMessage("");
      }
    }, [currentStep, formData, parentId, concatenateAreaCode, simulateProgress]);

  
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
                  <div className="loading-container">
                    <ProgressBar 
                      now={progress} 
                      label={`${progress}%`} 
                      animated 
                      style={{ backgroundColor: '#e9ecef', height: '25px' }}
                    >
                      <ProgressBar 
                        now={progress} 
                        label={`${progress}%`} 
                        style={{ backgroundColor: '#317B41' }} 
                      />
                    </ProgressBar>
                    <div className="text-center mt-2">
                      <Spinner animation="border" size="sm" style={{ color: '#317B41' }} className="me-2" />
                      <span>{loadingMessage}</span>
                    </div>
                  </div>
                )}
                <Form onSubmit={handleNextStep} ref={ref}>
                  {currentStep === 1 && (
                    <ParentForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                      errors={errors}
                    />
                  )}
                  {currentStep === 2 && (
                    <ApplicantForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                      handleAgeChange={handleAgeChange}
                      birthdayRef={birthdayRef}
                      errors={errors}
                      programs={programs}
                    />
                  )}
                  {currentStep === 3 && <Confirm formData={formData} />}
                  <div className="form-navigation-buttons">
                    {currentStep > 1 && currentStep < 3 && (
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        className="buttons-apply-form"
                        disabled={isLoading}
                      >
                        Previous
                      </button>
                    )}
                    {currentStep < 3 && (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="buttons-apply-form float-right"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Processing...' : 'Next'}
                      </button>
                    )}
                    {currentStep === 3 && (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="buttons-apply-form float-right"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Submitting...' : 'Submit'}
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
  });
  
  export default ApplyForm;
