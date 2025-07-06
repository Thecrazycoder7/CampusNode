import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginPage.css";
import { useAuthStore } from "../../store/useAuthStore";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    const result = await login(formData);
    if (result?.success) navigate("/start");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img
          src="/node-white.png"
          alt="CampusNode Logo"
          className="mb-3 mx-auto"
          style={{ width: "150px", objectFit: "contain" }}
        />
        <h2>Login</h2>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit" className="login-button">
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        <span>
          Don't have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
