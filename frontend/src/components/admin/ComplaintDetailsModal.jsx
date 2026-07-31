import React, { useState } from "react";
import StatusBadge from "./StatusBadge";
import { updateComplaintStatus } from "../../api/complaintApi";
import "./ComplaintDetailsModal.css";

const STATUS_OPTIONS = ["PENDING", "IN_PROGRESS", "RESOLVED", "REJECTED"];

function ComplaintDetailsModal({ complaint, onClose, onStatusUpdated }) {
  const [newStatus, setNewStatus] = useState(complaint?.status || "PENDING");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (complaint) {
      setNewStatus(complaint.status || "PENDING");
      setError("");
    }
  }, [complaint]);

  if (!complaint) return null;

  const handleUpdate = async () => {
    setSaving(true);
    setError("");
    try {
      await updateComplaintStatus(complaint.id, newStatus);
      if (onStatusUpdated) onStatusUpdated();
      onClose();
    } catch (err) {
      setError("Could not update status. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Complaint Details</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <p><strong>Complaint ID:</strong> {complaint.id}</p>
          <p><strong>Citizen Name:</strong> {complaint.citizenName}</p>
          <p><strong>Issue:</strong> {complaint.issue}</p>
          <p><strong>Department:</strong> {complaint.department}</p>
          <p><strong>Priority:</strong> {complaint.priority}</p>
          <p>
            <strong>Current Status:</strong> <StatusBadge status={complaint.status} />
          </p>
          <p><strong>Submitted On:</strong> {complaint.submittedOn}</p>
          <p><strong>Description:</strong> {complaint.description}</p>

          {complaint.imageUrl && (
            <div className="modal-image-block">
              <strong>Photo:</strong>
              <img className="modal-complaint-image" src={complaint.imageUrl} alt="Complaint" />
            </div>
          )}

          {complaint.latitude != null && complaint.longitude != null && (
            <p>
             <strong>Location:</strong>{" "}
              
                href={`https://www.google.com/maps?q=${complaint.latitude},${complaint.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              
                View on map ({complaint.latitude.toFixed(5)}, {complaint.longitude.toFixed(5)})
              
            </p>
          )}

          <div className="modal-status-update">
            <label htmlFor="status-select"><strong>Update Status</strong></label>
            <select
              id="status-select"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.replace("_", " ")}
                </option>
              ))}
            </select>

            {error && <p className="modal-status-error">{error}</p>}

            <button
              className="modal-status-save"
              onClick={handleUpdate}
              disabled={saving || newStatus === complaint.status}
            >
              {saving ? "Saving..." : "Update Status"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetailsModal;