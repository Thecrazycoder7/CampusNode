import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../Pages/HomePage.css"; // Import the styles

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Logo at the top */}
      <div className="logo-container">
        <img
          src="/node-white.png"
          alt="Campus Node Logo"
          className="logo"
        />
      </div>

      <div className="welcome-content">
        <h1>Welcome to Campus Node</h1>
        <p>
          Campus Node is a platform designed for students at all stages of their
          academic journey. Whether you are a **junior** looking for guidance or
          a **senior** eager to share your knowledge, this is the place to
          connect, learn, and grow together.
        </p>
        <p>
          Here, juniors can interact with seniors to get insights on their
          studies, career paths, and real-world experiences. Seniors can help
          guide juniors, share resources, and offer mentorship, all while
          gaining valuable leadership and communication skills.
        </p>

        <div className="button-container">
          <Link to="/register">
            <button className="register-button">Register</button>
          </Link>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
