import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../../store/useAuthStore";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    year: "",
    branch: "",
    college: "",
    password: "",
    linkedin: "",
    github: "",
    about: "",
    skills: "",
  });

  const navigate = useNavigate();
  const { signup } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    for (let key in formData) {
      if (!formData[key].trim()) {
        toast.error(
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
        );
        return false;
      }
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formattedData = {
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
    };

    const result = await signup(formattedData);
    if (result?.success) navigate("/login");
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <div className="logo-container">
          <img src="/node-white.png" alt="Campus Node Logo" className="logo" />
        </div>
        <h2>Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-column">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="about">About</label>
              <input
                type="text"
                id="about"
                name="about"
                value={formData.about}
                onChange={handleChange}
                required
              />

              <label htmlFor="year">Year of Passing</label>
              <input
                type="text"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              />

              <label htmlFor="linkedin">LinkedIn URL</label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-column">
              <label htmlFor="branch">Branch</label>
              <input
                type="text"
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
              />

              <label htmlFor="college">College</label>
              <input
                type="text"
                id="college"
                name="college"
                value={formData.college}
                onChange={handleChange}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <label htmlFor="github">GitHub URL</label>
              <input
                type="text"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
                required
              />

              <label htmlFor="skills">Skills</label>
              <input
                type="text"
                id="skills"
                name="skills"
                placeholder="e.g. React, Node.js, MongoDB"
                value={formData.skills}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="button-container">
            <button type="submit" className="register-button">
              Register
            </button>
          </div>

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
