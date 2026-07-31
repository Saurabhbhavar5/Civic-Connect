import React, { useState } from "react";
import { Link } from "react-router-dom";
import SubmitComplaint from "../components/user/SubmitComplaint";
import TrackComplaint from "../components/user/TrackComplaint";
import "./UserDashboard.css";

function UserDashboard() {
  const [tab, setTab] = useState("submit");

  return (
    <div className="user-dashboard">
      <header className="user-dashboard-header">
        <h2>Civic Connect</h2>
        <Link to="/" className="user-dashboard-logout">Logout</Link>
      </header>
      <div className="user-dashboard-tabs">
        <button
          className={tab === "submit" ? "active" : ""}
          onClick={() => setTab("submit")}
        >
          Submit Complaint
        </button>
        <button
          className={tab === "track" ? "active" : ""}
          onClick={() => setTab("track")}
        >
          Track Complaint
        </button>
      </div>
      <div className="user-dashboard-content">
        {tab === "submit" ? <SubmitComplaint /> : <TrackComplaint />}
      </div>
    </div>
  );
}

export default UserDashboard;
