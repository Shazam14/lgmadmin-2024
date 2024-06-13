import React from "react";
import { Form, FormControl } from "react-bootstrap";

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

const ParentForm = ({ formData, handleInputChange }) => {
  return (
    <div className="form-app-section">
      <h3 className="label">Parent's Information</h3>
      <div className="parent-info-card">
        {renderInput("parent", "first_name", formData, handleInputChange)}
        {renderInput("parent", "middle_name", formData, handleInputChange)}
        {renderInput("parent", "last_name", formData, handleInputChange)}
        {renderInput("parent", "email", formData, handleInputChange, "email")}
        {renderInput("parent", "phone_number", formData, handleInputChange)}
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
        {renderInput(
          "parent",
          "primary_contact_value",
          formData,
          handleInputChange
        )}
        {renderInput(
          "parent",
          "primary_contact_type",
          formData,
          handleInputChange,
          "select",
          {
            options: ["Phone", "Email"],
          }
        )}
        {renderInput(
          "parent",
          "secondary_contact_value",
          formData,
          handleInputChange
        )}
        {renderInput(
          "parent",
          "secondary_contact_type",
          formData,
          handleInputChange,
          "select",
          {
            options: ["Phone", "Email"],
          }
        )}
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
      </div>
    </div>
  );
};

export default ParentForm;
