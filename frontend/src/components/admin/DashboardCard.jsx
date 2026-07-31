import React, { useEffect, useState } from "react";
import { getAllComplaints } from "../../api/complaintApi";
import "./DashboardCard.css";

const CARD_DEFS = [
  { key: "total", title: "Total Complaints", icon: "📋", subtitle: "All time" },
  { key: "pending", title: "Pending", icon: "⏳", subtitle: "Awaiting action" },
  { key: "inProgress", title: "In Progress", icon: "🔧", subtitle: "Being resolved" },
  { key: "resolved", title: "Resolved", icon: "✅", subtitle: "Closed successfully" },
];

// Fetches live complaints and derives dashboard stat counts from them.
function DashboardCard() {
  const [counts, setCounts] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllComplaints()
      .then((res) => {
        const data = res.data;
        setCounts({
          total: data.length,
          pending: data.filter((c) => c.status === "PENDING").length,
          inProgress: data.filter((c) => c.status === "IN_PROGRESS").length,
          resolved: data.filter((c) => c.status === "RESOLVED").length,
        });
      })
      .catch(() => setCounts({ total: 0, pending: 0, inProgress: 0, resolved: 0 }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-card-grid">
      {CARD_DEFS.map((card) => (
        <div className="dashboard-card" key={card.key}>
          <div className="dashboard-card-icon">{card.icon}</div>
          <div>
            <p className="dashboard-card-title">{card.title}</p>
            <p className="dashboard-card-count">{loading ? "-" : counts[card.key]}</p>
            <p className="dashboard-card-subtitle">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCard;