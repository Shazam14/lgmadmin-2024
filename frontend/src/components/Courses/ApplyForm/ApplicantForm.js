import React from "react";
import { Form, FormControl, Col, Row } from "react-bootstrap";

const renderInput = (
  model,
  field,
  formData,
  handleInputChange,
  type = "text",
  options = {}
) => (
  <Form.Group controlId={`${model}.${field}`}>
    <Form.Label>
      {options.label || field.replace("_", " ").toUpperCase()}:
    </Form.Label>
    {type === "select" ? (
      <FormControl
        as="select"
        name={`${model}.${field}`}
        value={formData[model][field]}
        onChange={handleInputChange}
        className={`input-card ${model}-appform-input`}
        {...options}
      >
        {options.options.map((option) => (
          <option key={option.value || option} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </FormControl>
    ) : (
      <FormControl
        type={type}
        placeholder={
          options.placeholder || field.replace("_", " ").toUpperCase()
        }
        className={`input-card ${model}-appform-input`}
        name={`${model}.${field}`}
        value={formData[model][field]}
        onChange={handleInputChange}
        {...options}
      />
    )}
  </Form.Group>
);

const ApplicantForm = ({
  formData,
  handleInputChange,
  handleAgeChange,
  birthdayRef,
  programs,
  birthDay,
}) => {
  return (
    <div className="form-app-section">
      <h3 className="label">Applicant Student Information</h3>
      <div className="student-info-card">
        {renderInput("applicant", "first_name", formData, handleInputChange)}
        {renderInput("applicant", "middle_name", formData, handleInputChange)}
        {renderInput("applicant", "last_name", formData, handleInputChange)}
        {renderInput(
          "applicant",
          "gender",
          formData,
          handleInputChange,
          "select",
          {
            options: ["Female", "Male"],
          }
        )}
        {renderInput(
          "applicant",
          "age",
          formData,
          handleInputChange,
          "number",
          {
            onChange: handleAgeChange,
          }
        )}
        {renderInput(
          "applicant",
          "birthday",
          formData,
          handleInputChange,
          "date",
          {
            ref: birthdayRef,
          }
        )}
        {renderInput(
          "applicant",
          "program_option",
          formData,
          handleInputChange,
          "select",
          {
            options: programs.map((program) => ({
              value: program.name,
              label: program.name,
            })),
          }
        )}
        <Row>
          <Col>
            <Form.Group controlId="studentEmail">
              <Form.Label>Student Email:</Form.Label>
              <FormControl
                type="email"
                placeholder="Student Email"
                className="input-card student-appform-input"
                name="applicant.email"
                value={formData.applicant.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="studentPhoneNumber">
              <Form.Label>Phone Number:</Form.Label>
              <FormControl
                type="text"
                placeholder="Student Phone Number"
                className="input-card student-appform-input"
                name="applicant.phone_number"
                value={formData.applicant.phone_number}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ApplicantForm;
