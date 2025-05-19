import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import "../components/LoginCSS/RegistrationForm.css"; // Import the styles
import { handleError, handleSuccess } from "../util.jsx";
import { ToastContainer } from "react-toastify";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    year: "",
    branch: "",
    college: "",
    password: "",
  });

  // for navigate to next page
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, year, branch, college, password } = formData;

    if (!name || !email || !year || !branch || !college || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log("Response from backend:", result); // Log full response
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(message); // Handle errors more clearly
      }
    } catch (error) {
      console.error("Request failed:", error); // Log fetch errors for debugging
    }
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
                id="year"
                name="year"
                required
                placeholder="Enter your year of passing"
                value={formData.year}
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

          {/* Add a link for users who already have an account */}
          <div className="login-link">
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </form>
        
        <ToastContainer />
        
      </div>
    </div>
  );
};

export default RegistrationForm;
