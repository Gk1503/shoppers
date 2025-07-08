import "../Settings/Settings.css";
import { useState } from "react";
import apiConfig from "../../../utils/apiConfig";

import { updatePassword } from "../../../utils/constant";

function Settings() {
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [admin, setAdmin] = useState({ AdminEmail: "gk@admin.com" }); // Replace with actual admin state after login
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCloseModal = () => {
    setShowChangePasswordModal(false);
    setError("");
    setSuccess("");
  };

  const handlePasswordUpdate = async () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const formdata = {
        AdminEmail: admin.AdminEmail,
        oldPassword,
        newPassword,
      };
      const response = await apiConfig.post(updatePassword, formdata);
      console.log(JSON.stringify(response));
      if (response.status === 200) {
        setSuccess("Password updated successfully.");
        setError("");
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <>
      <div>
        <button
          id="ChangePasswordButton"
          onClick={() => setShowChangePasswordModal(true)}
        >
          Update Profile
        </button>
      </div>

      {showChangePasswordModal && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1>Update Your Password</h1>

            <input type="email" value={admin.AdminEmail} disabled />
            <br></br>

            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <br></br>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <br></br>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button onClick={handlePasswordUpdate}>Update Password</button>
            <span className="close-button" onClick={handleCloseModal}>
              &times;
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default Settings;
