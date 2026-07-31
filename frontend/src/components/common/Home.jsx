import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>Civic Connect</h1>
        <p>Smart Community Issue Reporting System</p>
        <div className="home-actions">
          <Link to="/login" className="home-btn home-btn-primary">Citizen Login</Link>
          <Link to="/register" className="home-btn home-btn-secondary">Sign Up</Link>
          <Link to="/admin/login" className="home-btn home-btn-outline">Admin Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
