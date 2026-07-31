import React from "react";
import StatusBadge from "./StatusBadge";
import "./ComplaintTable.css";

// Displays each complaint as a reusable table row.
// Props: complaint data, onView event handler.
function ComplaintRow({ complaint, onView }) {
  return (
    <tr className="complaint-row">
      <td>{complaint.id}</td>
      <td>{complaint.citizenName}</td>
      <td>{complaint.issue}</td>
      <td>{complaint.department}</td>
      <td>{complaint.priority}</td>
      <td>
        <StatusBadge status={complaint.status} />
      </td>
      <td>
        <button className="complaint-row-view" onClick={() => onView(complaint)}>
          View
        </button>
      </td>
    </tr>
  );
}

export default ComplaintRow;
