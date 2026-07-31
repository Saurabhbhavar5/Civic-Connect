import React, { useState, useEffect } from "react";
import NotificationBell from "./NotificationBell";
import AdminProfile from "./AdminProfile";
import "./AdminHeader.css";

// Uses React Hooks (useState, useEffect) to display the current date
// and renders a reusable header with notification + profile components.
function AdminHeader({ adminName = "Admin" }) {
  const [today, setToday] = useState("");

  useEffect(() => {
    const date = new Date();
    setToday(
      date.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <h2>Civic Connect</h2>
        <span className="admin-header-date">{today}</span>
      </div>
      <div className="admin-header-right">
        <NotificationBell />
        <AdminProfile adminName={adminName} />
      </div>
    </header>
  );
}

export default AdminHeader;
