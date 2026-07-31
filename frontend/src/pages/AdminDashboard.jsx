import React, { useState } from "react";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import WelcomeCard from "../components/admin/WelcomeCard";
import DashboardCard from "../components/admin/DashboardCard";
import ComplaintTable from "../components/admin/ComplaintTable";
import DepartmentCard from "../components/admin/DepartmentCard";
import "./AdminDashboard.css";

// Main container: imports AdminHeader, which composes the other
// admin components. Keeps AdminDashboard.jsx focused on layout only.
function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="admin-dashboard-layout">
      <AdminSidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="admin-dashboard-main">
        <AdminHeader adminName="Saurabh" />
        <div className="admin-dashboard-content">
          <WelcomeCard adminName="Saurabh" todayCount={12} resolvedCount={73} />
          <DashboardCard />

          {activePage === "departments" ? (
            <DepartmentCard />
          ) : (
            <ComplaintTable />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;