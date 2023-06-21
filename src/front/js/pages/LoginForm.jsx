// LoginForm.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../store/AuthContext";
import Swal from "sweetalert2";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, setUsername } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "email": email, "password": password }),
      });
  
      const data = await response.json();
      console.log(response.status);
  
      if (response.status == 200) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setUsername(email);
        navigate("/private");
      } else {
        Swal.fire({ // Use Swal.fire to display an error message
          icon: 'error',
          title: 'Oops...',
          text: data.mensaje,
        }); // <- Add a closing parenthesis and semicolon here
      }
    } catch (error) {
      console.log(error);
      Swal.fire({ // Use Swal.fire to display an error message
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while trying to log in',
      });
    }
  
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="p-3">
          <Button type="submit" className="btn btn-primary mr-3">
            Login
          </Button>
          <Button
            type="button"
            className="btn btn-secondary ml-5"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
