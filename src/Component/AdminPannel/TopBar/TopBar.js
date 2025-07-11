import React from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";
import AdminLoginModule from "../AdminLoginModule/AdminLoginModule";

function TopBar({ setAdmin }) {
  const navigate = useNavigate();

  const handleLoginSuccess = (adminData) => {
    setAdmin(adminData);
    navigate('/AdminDashboard');
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <span className="close-button" onClick={() => navigate("/")}>
          &times;
        </span>
        <AdminLoginModule
          onClose={() => navigate("/")}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </div>
  );
}

export default TopBar;
