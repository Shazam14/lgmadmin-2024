import React from "react";
import { Form, FormControl, Col, Row } from "react-bootstrap";

const renderInput = (
  model,
  field,
  formData,
  handleInputChange,
  errors,
  type = "text",
  options = {}
) => (
  <Form.Group controlId={`${model}.${field}`}>
    <Form.Label>
      {field === "first_name" || field === "last_name"
        ? `APPLICANT ${options.label || field.replace("_", " ").toUpperCase()}: *`
        : field === "middle_name"
          ? `APPLICANT ${options.label || field.replace("_", " ").toUpperCase()}: `
          : field === "age"
            ? `${options.label || field.replace("_", " ").toUpperCase()}: `
            : `${options.label || field.replace("_", " ").toUpperCase()}: *`}
      {errors[field] && <div className="text-danger">{errors[field]}</div>}
    </Form.Label> 
    {type === "select" ? (
      <FormControl
        as="select"
        name={`${model}.${field}`}
        value={formData[model][field]}
        onChange={handleInputChange}
        className={`input-card ${model}-appform-input ${errors[field] ? "apply-field-errors" : ""}`}
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
        className={`input-card ${model}-appform-input ${errors[field] ? "apply-field-errors" : ""}`}
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
  errors,
  programs,
  birthDay,
}) => {
  return (
    <div className="form-app-section">
      <h3 className="label">Applicant Student Information</h3>
      <div className="student-info-card">
        {renderInput(
          "applicant",
          "first_name",
          formData,
          handleInputChange,
          errors
        )}
        {renderInput(
          "applicant",
          "middle_name",
          formData,
          handleInputChange,
          errors
        )}
        {renderInput(
          "applicant",
          "last_name",
          formData,
          handleInputChange,
          errors
        )}
        {renderInput(
          "applicant",
          "gender",
          formData,
          handleInputChange,
          errors,
          "select",
          {
            options: ["Female", "Male"],
          }
        )}
        <Row>
          <Col>
            {renderInput(
              "applicant",
              "age",
              formData,
              handleInputChange,
              errors,
              "number",
              {
                onChange: handleAgeChange,
              }
            )}
          </Col>
          <Col>
            {renderInput(
              "applicant",
              "birthday",
              formData,
              handleInputChange,
              errors,
              "date",
              {
                ref: birthdayRef,
              }
            )}
          </Col>
        </Row>
        {renderInput(
          "applicant",
          "program_option",
          formData,
          handleInputChange,
          errors,
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
              <Form.Label>
                Student Email:
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </Form.Label>
              <FormControl
                type="email"
                placeholder="Student Email"
                className={`input-card student-appform-input ${errors.email ? "apply-field-errors" : ""}`}
                name="applicant.email"
                value={formData.applicant.email}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="studentPhoneNumber">
              <Form.Label>
                Phone Number:
                {errors.phone_number && (
                  <div className="text-danger">{errors.phone_number}</div>
                )}
              </Form.Label>
              <FormControl
                type="text"
                placeholder="Student Phone Number"
                className={`input-card student-appform-input ${errors.phone_number ? "apply-field-errors" : ""}`}
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
