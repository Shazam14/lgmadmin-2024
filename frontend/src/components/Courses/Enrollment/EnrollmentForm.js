import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const EnrollmentForm = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    if (token) {
      const decoded = jwt_decode(token);
      setFormData({
        ...decoded,
        // Set other form fields based on decoded JWT
      });
    }
  }, [location]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.firstName || ""}
        onChange={handleChange}
        name="firstName"
      />
      {/* Render other inputs similarly */}
    </form>
  );
};

export default EnrollmentForm;
