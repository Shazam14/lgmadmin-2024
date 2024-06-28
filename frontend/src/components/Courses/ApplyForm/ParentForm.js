import React, { useState } from "react";
import { Form, FormControl, Row, Col } from "react-bootstrap";

const renderInput = (
  model,
  field,
  formData,
  handleInputChange,
  errors,
  type = "text",
  options = {}
) => (
  <Form.Group as={Row} controlId={`${model}.${field}`} className="mb-3">
    <Form.Label column sm={3} className="no-padding-top">
      {field === "first_name" || field === "last_name"
        ? `PARENT ${options.label || field.replace("_", " ").toUpperCase()}: *`
        : field === "middle_name"
          ? `PARENT ${options.label || field.replace("_", " ").toUpperCase()}: `
          : field === "contact_priority"
            ? "which phone number do you want us to contact you? *".toUpperCase()
            : field === "state_province"
              ? "Province:".toUpperCase()
              : `${options.label || field.replace("_", " ").toUpperCase()}: *`}
      {errors[field] && <div className="text-danger">{errors[field]}</div>}
    </Form.Label>
    <Col sm={9}>
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
          className={`input-card ${model}-appform-input ${errors[field] ? "apply-field-errors" : ""}`}
          name={`${model}.${field}`}
          value={formData[model][field]}
          onChange={(e) => handleInputChange(e)}
          {...options}
        />
      )}
    </Col>
  </Form.Group>
);

const ParentForm = React.memo(({ formData, handleInputChange, errors }) => {
  return (
    <div className="form-app-section">
      <h3 className="label">Parent's Information</h3>
      <p className="label">Fields marked with an asterisk (*) are required</p>
      <div className="parent-info-card">
        {renderInput(
          "parent",
          "first_name",
          formData,
          handleInputChange,
          errors
        )}
        {renderInput(
          "parent",
          "middle_name",
          formData,
          handleInputChange,
          errors
        )}
        {renderInput(
          "parent",
          "last_name",
          formData,
          handleInputChange,
          errors
        )}
        {renderInput(
          "parent",
          "email",
          formData,
          handleInputChange,
          errors,
          "email"
        )}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            PRIMARY PHONE NUMBER: *
            {errors.primary_contact_value && (
              <div className="text-danger">{errors.primary_contact_value}</div>
            )}
          </Form.Label>
          <Col sm={9}>
            <div className="phone-number-group">
              <FormControl
                type="text"
                className="country-code input-card parent-appform-input"
                id="country_code1"
                value="+63"
                disabled
              />
              <FormControl
                type="text"
                id="primary_phone_number"
                name="parent.primary_contact_value"
                value={formData.parent.primary_contact_value}
                onChange={handleInputChange}
                className={`input-card parent-appform-input ${errors.primary_contact_value ? "apply-field-errors" : ""}`}
                placeholder="input number in this format: 9123456789"
                maxLength={10}
              />
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={3}>
            SECONDARY PHONE NUMBER:
            {errors.phone_number && (
              <div className="text-danger">{errors.phone_number}</div>
            )}
          </Form.Label>
          <Col sm={9}>
            <div className="phone-number-group">
              <FormControl
                type="text"
                className="country-code input-card parent-appform-input "
                id="country_code2"
                value="+63"
                disabled
              ></FormControl>
              <FormControl
                type="text"
                id="secondary_phone_number"
                className={`input-card parent-appform-input ${errors.phone_number ? "apply-field-errors" : ""}`}
                placeholder="input number in this format: 9123456789"
                maxLength={10}
              ></FormControl>
              {errors.phone_number && (
                <div className="text-danger">{errors.phone_number}</div>
              )}
            </div>
          </Col>
        </Form.Group>
        {renderInput(
          "parent",
          "contact_priority",
          formData,
          handleInputChange,
          errors,
          "select",
          {
            options: ["Primary", "Secondary"],
          }
        )}
        {renderInput(
          "parent",
          "street_address",
          formData,
          handleInputChange,
          errors
        )}
        {renderInput("parent", "city", formData, handleInputChange, errors)}
        {renderInput(
          "parent",
          "state_province",
          formData,
          handleInputChange,
          errors
        )}
        {renderInput(
          "parent",
          "relationship",
          formData,
          handleInputChange,
          errors,
          "select",
          {
            options: [
              { value: "Mother", label: "Mother" },
              { value: "Father", label: "Father" },
              { value: "Guardian", label: "Guardian" },
            ],
          }
        )}
      </div>
    </div>
  );
});

export default ParentForm;
