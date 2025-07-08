import React, { useState } from "react";
import "./TopBar.css";
import AdminLoginModule from "../AdminLoginModule/AdminLoginModule";

function TopBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginSuccess = (adminData) => {
    setAdmin(adminData);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setAdmin(null);
    setShowLogout(false);
  };

  return (
    <>
      <div id="TopBar">
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <form className="d-flex">
              <input
                className="form-control search me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success me-2" type="submit">
                Search
              </button>
            </form>

            {admin ? (
              <div
                className="admin-info"
                onMouseOver={() => setShowLogout(true)}
                onMouseLeave={() => setShowLogout(false)}
              >
                <button className="btn btn-dark">
                  {admin.AdminEmail}
                </button>
                {showLogout && (
                  <div className="logout-dropdown">
                    <button onClick={handleLogout} className="btn btn-danger">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="loginButton"
                className="btn btn-primary"
                onClick={() => setShowLoginModal(true)}
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Modal */}
      {showLoginModal && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
            <div className="modal-header">
              
            </div>
            <AdminLoginModule
              onClose={handleCloseModal}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default TopBar;
