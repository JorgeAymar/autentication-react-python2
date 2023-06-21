// ./component/LoginStatus.jsx

import React from "react";
import { useAuth } from "../store/AuthContext";

function LoginStatus() {
  const { isLoggedIn, username } = useAuth();

  return (
    <div className="text-right">
      {isLoggedIn ? (
        <span>Login: {username}</span>
      ) : (
        <span>Login: none</span>
      )}
    </div>
  );
}

export default LoginStatus;
