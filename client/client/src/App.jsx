import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from './components/RegistrationForm';
import LoginPage from './components/LoginPage';
import HomePage from './components/Pages/HomePage';
import "./App.css"

import WelcomePage from './components/Pages/WelcomePage';

function App() {
  return (
    <div className="w-100">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/start" element={<WelcomePage />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App
