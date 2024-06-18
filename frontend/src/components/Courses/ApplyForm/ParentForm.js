import React from "react";
import { Form, FormControl, Row, Col } from "react-bootstrap";

const renderInput = (
  model,
  field,
  formData,
  handleInputChange,
  type = "text",
  options = {}
) => (
  <Form.Group as={Row} controlId={`${model}.${field}`} className="mb-3">
    <Form.Label column sm={3}>
      { 
        field === "first_name" || field === "middle_name" || field === "last_name"
        ? `PARENT ${options.label || field.replace("_", " ").toUpperCase()}:`
        : field === "phone_code"
        ? null
        : field === "primary_contact_value"      
        ? "Primary phone number:".toUpperCase()
        : field === "phone_number"
        ? "Secondary phone number:".toUpperCase()
        : field === "contact_priority"
        ? "which phone number do you want us to contact you?".toUpperCase()
        : field === "state_province"
        ? "Province:".toUpperCase()
        : `${options.label || field.replace("_", " ").toUpperCase()}:`
      }
    </Form.Label>
    <Col sm={9}>
    <div className="phone-number-group">
        {(field === "phone_number" || field === "primary_contact_value") && (
          <FormControl
            type="text"
            className="phone-code-input"
            value="+63"
            disabled
          />
        )}
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
          className={`input-card ${model}-appform-input`}
          name={`${model}.${field}`}
          value={formData[model][field]}
          onChange={(e) =>handleInputChange(e)}
          maxLength={
            field === "phone_number" || field === "primary_contact_value"
              ? 11
              : 100
          }
          {...options}
        />
      )}
    </div>
    </Col>
  </Form.Group>
);

const ParentForm = ({ formData, handleInputChange }) => {
  return (
    <div className="form-app-section">
      <h3 className="label">Parent's Information</h3>
      <div className="parent-info-card">
        {renderInput("parent", "first_name", formData, handleInputChange)}
        {renderInput("parent", "middle_name", formData, handleInputChange)}
        {renderInput("parent", "last_name", formData, handleInputChange)}
        {renderInput("parent", "email", formData, handleInputChange, "email")}
        {renderInput(
          "parent",
          "primary_contact_value",
          formData,
          handleInputChange
        )}
        {renderInput("parent", "phone_number", formData, handleInputChange)}
        {renderInput(
          "parent",
          "contact_priority",
          formData,
          handleInputChange,
          "select",
          {
            options: ["Primary", "Secondary"],
          }
        )}
        {renderInput("parent", "street_address", formData, handleInputChange)}
        {renderInput("parent", "city", formData, handleInputChange)}
        {renderInput("parent", "state_province", formData, handleInputChange)}
        {renderInput(
          "parent",
          "relationship",
          formData,
          handleInputChange,
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
};

export default ParentForm;
