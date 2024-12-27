import React, { useState } from "react";
import { Input } from "../../../ui/input";
import { Select } from "../../../ui/select";
import { AlertCircle, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Alert, AlertDescription } from "../../../ui/alert";
import { Modal } from "../../../ui/modal";

const STEPS = {
  STUDENT_INFO: "STUDENT_INFO",
  PROGRAM_SELECT: "PROGRAM_SELECT",
  PREVIOUS_SCHOOL: "PREVIOUS_SCHOOL",
  CONFIRMATION: "CONFIRMATION",
};

export const EnrollmentWizard = ({
  isOpen,
  onClose,
  onSubmit,
  applicant = null,
  programs = [],
  academicYear,
  semester,
}) => {
  const [currentStep, setCurrentStep] = useState(STEPS.STUDENT_INFO);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    studentInfo: {
      firstName: applicant?.first_name || "",
      lastName: applicant?.last_name || "",
      birthDate: applicant?.birth_date || "",
      gender: applicant?.gender || "",
      email: applicant?.email || "",
    },
    programInfo: {
      programId: applicant?.program_id || "",
      gradeLevel: "",
      section: "",
    },
    previousSchool: {
      schoolName: "",
      address: "",
      contactNumber: "",
      lastGradeCompleted: "",
    },
  });

  const updateFormData = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setError(null);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case STEPS.STUDENT_INFO:
        if (!formData.studentInfo.firstName || !formData.studentInfo.lastName) {
          setError("Please fill in all required fields");
          return false;
        }
        break;
      case STEPS.PROGRAM_SELECT:
        if (
          !formData.programInfo.programId ||
          !formData.programInfo.gradeLevel
        ) {
          setError("Please select a program and grade level");
          return false;
        }
        break;
      case STEPS.PREVIOUS_SCHOOL:
        if (!formData.previousSchool.schoolName) {
          setError("Please provide previous school information");
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    switch (currentStep) {
      case STEPS.STUDENT_INFO:
        setCurrentStep(STEPS.PROGRAM_SELECT);
        break;
      case STEPS.PROGRAM_SELECT:
        setCurrentStep(STEPS.PREVIOUS_SCHOOL);
        break;
      case STEPS.PREVIOUS_SCHOOL:
        setCurrentStep(STEPS.CONFIRMATION);
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case STEPS.PROGRAM_SELECT:
        setCurrentStep(STEPS.STUDENT_INFO);
        break;
      case STEPS.PREVIOUS_SCHOOL:
        setCurrentStep(STEPS.PROGRAM_SELECT);
        break;
      case STEPS.CONFIRMATION:
        setCurrentStep(STEPS.PREVIOUS_SCHOOL);
        break;
    }
  };

  const handleSubmit = async () => {
    try {
      const enrollmentData = {
        ...formData,
        applicantId: applicant?.id,
        academicYear,
        semester,
      };
      await onSubmit(enrollmentData);
      onClose();
    } catch (err) {
      setError("Failed to process enrollment");
    }
  };

  const renderStudentInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            value={formData.studentInfo.firstName}
            onChange={(e) =>
              updateFormData("studentInfo", "firstName", e.target.value)
            }
            disabled={!!applicant}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={formData.studentInfo.lastName}
            onChange={(e) =>
              updateFormData("studentInfo", "lastName", e.target.value)
            }
            disabled={!!applicant}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Birth Date
        </label>
        <input
          type="date"
          value={formData.studentInfo.birthDate}
          onChange={(e) =>
            updateFormData("studentInfo", "birthDate", e.target.value)
          }
          disabled={!!applicant}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender
        </label>
        <select
          value={formData.studentInfo.gender}
          onChange={(e) =>
            updateFormData("studentInfo", "gender", e.target.value)
          }
          disabled={!!applicant}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
    </div>
  );

  const renderProgramSelect = () => (
    <div className="space-y-4">
      <Select
        label="Program"
        value={formData.programInfo.programId}
        onChange={(e) =>
          updateFormData("programInfo", "programId", e.target.value)
        }
        required
      >
        <option value="">Select Program</option>
        {programs.map((program) => (
          <option key={program.id} value={program.id}>
            {program.name}
          </option>
        ))}
      </Select>
      <Select
        label="Grade Level"
        value={formData.programInfo.gradeLevel}
        onChange={(e) =>
          updateFormData("programInfo", "gradeLevel", e.target.value)
        }
        required
      >
        <option value="">Select Grade Level</option>
        <option value="Grade 1">Grade 1</option>
        <option value="Grade 2">Grade 2</option>
        <option value="Grade 3">Grade 3</option>
        <option value="Grade 4">Grade 4</option>
        <option value="Grade 5">Grade 5</option>
        <option value="Grade 6">Grade 6</option>
        <option value="Grade 7">Grade 7</option>
        <option value="Grade 8">Grade 8</option>
        <option value="Grade 9">Grade 9</option>
        <option value="Grade 10">Grade 10</option>
      </Select>
      <Select
        label="Section"
        value={formData.programInfo.section}
        onChange={(e) =>
          updateFormData("programInfo", "section", e.target.value)
        }
        required
      >
        <option value="">Select Section</option>
        <option value="A">Section A</option>
        <option value="B">Section B</option>
        <option value="C">Section C</option>
      </Select>
    </div>
  );

  const renderPreviousSchool = () => (
    <div className="space-y-4">
      <Input
        label="Previous School Name"
        value={formData.previousSchool.schoolName}
        onChange={(e) =>
          updateFormData("previousSchool", "schoolName", e.target.value)
        }
        required
      />
      <Input
        label="School Address"
        value={formData.previousSchool.address}
        onChange={(e) =>
          updateFormData("previousSchool", "address", e.target.value)
        }
      />
      <Input
        label="Contact Number"
        value={formData.previousSchool.contactNumber}
        onChange={(e) =>
          updateFormData("previousSchool", "contactNumber", e.target.value)
        }
      />
      <Input
        label="Last Grade Level Completed"
        value={formData.previousSchool.lastGradeCompleted}
        onChange={(e) =>
          updateFormData("previousSchool", "lastGradeCompleted", e.target.value)
        }
        required
      />
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Student Information</h4>
        <p>
          Name: {formData.studentInfo.firstName} {formData.studentInfo.lastName}
        </p>
        <p>
          Program:{" "}
          {programs.find((p) => p.id === formData.programInfo.programId)?.name}
        </p>
        <p>Grade Level: {formData.programInfo.gradeLevel}</p>
        <p>Section: {formData.programInfo.section}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Enrollment Details</h4>
        <p>Academic Year: {academicYear}</p>
        <p>Semester: {semester}</p>
        <p>Previous School: {formData.previousSchool.schoolName}</p>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case STEPS.STUDENT_INFO:
        return renderStudentInfo();
      case STEPS.PROGRAM_SELECT:
        return renderProgramSelect();
      case STEPS.PREVIOUS_SCHOOL:
        return renderPreviousSchool();
      case STEPS.CONFIRMATION:
        return renderConfirmation();
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case STEPS.STUDENT_INFO:
        return "Student Information";
      case STEPS.PROGRAM_SELECT:
        return "Program Selection";
      case STEPS.PREVIOUS_SCHOOL:
        return "Previous School Details";
      case STEPS.CONFIRMATION:
        return "Confirm Enrollment";
      default:
        return "";
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {Object.values(STEPS).map((step, index) => (
        <React.Fragment key={step}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              Object.values(STEPS).indexOf(currentStep) >= index
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {index + 1}
          </div>
          {index < Object.values(STEPS).length - 1 && (
            <div
              className={`h-1 w-12 ${
                Object.values(STEPS).indexOf(currentStep) > index
                  ? "bg-green-600"
                  : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getStepTitle()}
      maxWidth="max-w-3xl"
    >
      <div className="py-4">
        {renderStepIndicator()}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
            <div className="flex">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {renderStepContent()}

        <div className="flex justify-between mt-6">
          {currentStep !== STEPS.STUDENT_INFO && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}

          {currentStep !== STEPS.CONFIRMATION ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ml-auto"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ml-auto"
            >
              <Check className="w-4 h-4" />
              Complete Enrollment
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default EnrollmentWizard;
