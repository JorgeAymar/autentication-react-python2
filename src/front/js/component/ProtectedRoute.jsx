// ProtectedRoute.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const checkAuthorization = async () => {
      if (isLoggedIn) {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/check`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, 
            },
          });

          if (response.status === 200) {
            setStatus("authorized");
          } else {
            setStatus("unauthorized");
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.mensaje,
          });
          setStatus("unauthorized");
        }
      } else {
        setStatus("unauthorized");
      }
    };

    checkAuthorization();
  }, [isLoggedIn]);

  if (status === "unauthorized") {
    navigate("/noautorizado");
    return null;
  }

  if (status === "checking") {
    return null; // Return null or some kind of loading spinner while checking for authorization
  }

  return children;
};

export default ProtectedRoute;
