import React from "react";
import "./WelcomeCard.css";

// Displays a welcome message and summary statistics.
function WelcomeCard({ adminName = "Admin", todayCount = 0, resolvedCount = 0 }) {
  return (
    <section className="welcome-card">
      <div>
        <h3>Welcome back, {adminName} 👋</h3>
        <p className="welcome-card-role">Role: Administrator</p>
        <p className="welcome-card-desc">
          Here's a quick overview of citizen complaints and activity today.
        </p>
      </div>
      <div className="welcome-card-stats">
        <div className="welcome-card-stat">
          <span className="welcome-card-stat-value">{todayCount}</span>
          <span className="welcome-card-stat-label">Today's Complaints</span>
        </div>
        <div className="welcome-card-stat">
          <span className="welcome-card-stat-value">{resolvedCount}</span>
          <span className="welcome-card-stat-label">Resolved</span>
        </div>
      </div>
    </section>
  );
}

export default WelcomeCard;
