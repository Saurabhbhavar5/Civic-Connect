import React from "react";
import "./DepartmentCard.css";

const departments = [
  { name: "Sanitation", officer: "R. Kulkarni", pending: 12, progress: 68 },
  { name: "Roads", officer: "S. Iyer", pending: 8, progress: 54 },
  { name: "Water Supply", officer: "M. Naik", pending: 5, progress: 82 },
  { name: "Electricity", officer: "P. Rao", pending: 9, progress: 47 },
];

// Uses map() to dynamically generate department cards with a
// progress bar showing the resolution rate.
function DepartmentCard() {
  return (
    <div className="department-card-grid">
      {departments.map((dept) => (
        <div className="department-card" key={dept.name}>
          <h4>{dept.name}</h4>
          <p className="department-card-officer">Officer: {dept.officer}</p>
          <p className="department-card-pending">{dept.pending} pending complaints</p>
          <div className="department-card-progress-track">
            <div
              className="department-card-progress-fill"
              style={{ width: `${dept.progress}%` }}
            />
          </div>
          <span className="department-card-progress-label">
            {dept.progress}% resolved
          </span>
        </div>
      ))}
    </div>
  );
}

export default DepartmentCard;
