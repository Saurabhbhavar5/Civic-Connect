import React, { useState } from "react";
import "./AdminProfile.css";

// Uses useState and conditional rendering to display an interactive
// admin profile with a dropdown menu for profile-related options.
function AdminProfile({ adminName = "Admin" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-profile">
      <button className="admin-profile-trigger" onClick={() => setOpen(!open)}>
        <span className="admin-profile-avatar">{adminName.charAt(0)}</span>
        <span>{adminName}</span>
      </button>
      {open && (
        <div className="admin-profile-dropdown">
          <button>My Profile</button>
          <button>Settings</button>
          <button className="admin-profile-logout">Logout</button>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
