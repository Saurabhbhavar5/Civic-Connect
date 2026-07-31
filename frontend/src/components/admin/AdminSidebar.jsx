import React from "react";
import "./AdminSidebar.css";

const MENU_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "complaints", label: "Complaints", icon: "📋" },
  { key: "departments", label: "Departments", icon: "🏢" },
  { key: "reports", label: "Reports", icon: "📊" },
  { key: "settings", label: "Settings", icon: "⚙️" },
];

// Creates a reusable navigation sidebar, highlighting the active page.
function AdminSidebar({ activePage = "dashboard", onNavigate = () => {} }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-title">Admin Dashboard</div>
      <nav>
        {MENU_ITEMS.map((item) => (
          <button
            key={item.key}
            className={`admin-sidebar-item ${
              activePage === item.key ? "active" : ""
            }`}
            onClick={() => onNavigate(item.key)}
          >
            <span className="admin-sidebar-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
