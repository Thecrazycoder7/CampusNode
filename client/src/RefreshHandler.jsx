// RefreshHandler.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {useAuth} from "./AuthContext"; // Import the useAuth hook

function RefreshHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); // Get setIsAuthenticated from context

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/start", { replace: true });
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefreshHandler;
