// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AuthProvider , useAuth } from "./AuthContext";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginPage";
import HomePage from "./components/Pages/HomePage";
import WelcomePage from "./components/Pages/WelcomePage";
import RefreshHandler from "./RefreshHandler";
import "./App.css";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Use the custom hook
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="w-100">
      <AuthProvider>
        <Router>
          <RefreshHandler />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/start"
              element={<PrivateRoute element={<WelcomePage />} />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
