import React, { useEffect, useState } from "react";
import StatusBadge from "../admin/StatusBadge";
import { getAllComplaints } from "../../api/complaintApi";
import "./TrackComplaint.css";

// Fetches and lists the citizen's submitted complaints with live status.
function TrackComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllComplaints()
      .then((res) => setComplaints(res.data))
      .catch(() => setComplaints([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading your complaints...</p>;

  return (
    <div className="track-complaint">
      <h3>Track Your Complaints</h3>
      {complaints.length === 0 ? (
        <p className="track-complaint-empty">No complaints submitted yet.</p>
      ) : (
        <ul className="track-complaint-list">
          {complaints.map((c) => (
            <li key={c.id} className="track-complaint-item">
              <div>
                <p className="track-complaint-issue">{c.issue}</p>
                <span className="track-complaint-date">{c.submittedOn}</span>
              </div>
              <StatusBadge status={c.status} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TrackComplaint;
