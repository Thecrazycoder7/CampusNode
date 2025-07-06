import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../components/LoginCSS/RegistrationForm.css"; // Import the styles

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    yearOfPassing: "",
    branch: "",
    college: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., API call or form validation)
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="registration-container">
      <div className="logo-container">
        <img src="/node-white.png" alt="Campus Node Logo" className="logo" />
      </div>

      <div className="registration-form">
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-column">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />

              <label htmlFor="yearOfPassing">Year of Passing</label>
              <input
                type="text"
                id="yearOfPassing"
                name="yearOfPassing"
                required
                placeholder="Enter your year of passing"
                value={formData.yearOfPassing}
                onChange={handleChange}
              />
            </div>

            <div className="form-column">
              <label htmlFor="branch">Branch</label>
              <input
                type="text"
                id="branch"
                name="branch"
                required
                placeholder="Enter your branch"
                value={formData.branch}
                onChange={handleChange}
              />

              <label htmlFor="college">College</label>
              <input
                type="text"
                id="college"
                name="college"
                required
                placeholder="Enter your college name"
                value={formData.college}
                onChange={handleChange}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="button-container">
            <button type="submit" className="register-button">
              Register
            </button>
          </div>
        </form>

        {/* Add a link for users who already have an account */}
        <div className="login-link">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
