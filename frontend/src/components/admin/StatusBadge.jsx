import React from "react";
import "./StatusBadge.css";

// Backend sends enum values like "PENDING" / "IN_PROGRESS"; this normalizes
// both that format and human-readable labels ("Pending") to one display form.
const STATUS_MAP = {
  PENDING: { label: "Pending", className: "status-pending" },
  IN_PROGRESS: { label: "In Progress", className: "status-in-progress" },
  RESOLVED: { label: "Resolved", className: "status-resolved" },
  REJECTED: { label: "Rejected", className: "status-rejected" },
};

function normalize(status) {
  if (!status) return null;
  const key = status.toString().trim().toUpperCase().replace(/\s+/g, "_");
  return STATUS_MAP[key] || { label: status, className: "" };
}

// Uses props and a lookup table to apply dynamic CSS styles
// and display the complaint status as a colored badge.
function StatusBadge({ status }) {
  const { label, className } = normalize(status) || { label: "Unknown", className: "" };

  return <span className={`status-badge ${className}`}>{label}</span>;
}

export default StatusBadge;