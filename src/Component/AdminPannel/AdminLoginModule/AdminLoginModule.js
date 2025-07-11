import React, { useState } from "react";
import "../AdminLoginModule/ALM.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLoginModule({ onClose, onLoginSuccess }) {
  const [AdminEmail, setAdminEmail] = useState("");
  const [AdminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!AdminEmail || !AdminPassword) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          AdminEmail,
          AdminPassword,
        }
      );
    
      if (response.status === 200) {
          // console.log(JSON.stringify(response.status));
        setError("");
        onLoginSuccess(response.data);
      }
      
    } catch (err) {
      console.error("Login error response:", err.response);

      if (err.response && err.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Server error. Please try again.");
      }
    }
  };

  return (
    <div className="login-form-wrapper">
      <h2>Admin Login</h2>

      <div className="form-group">
        <input
          type="email"
          placeholder="Admin Email"
          value={AdminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={AdminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default AdminLoginModule;
