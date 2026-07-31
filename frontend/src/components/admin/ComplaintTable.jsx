import React, { useEffect, useState, useMemo } from "react";
import ComplaintRow from "./ComplaintRow";
import ComplaintDetailsModal from "./ComplaintDetailsModal";
import SearchFilter from "./SearchFilter";
import { getAllComplaints, API_ORIGIN } from "../../api/complaintApi";
import "./ComplaintTable.css";

// Formats an ISO date string from the backend into a short readable date.
function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Converts an ALL_CAPS enum value ("IN_PROGRESS") into title case ("In Progress").
function titleCase(value) {
  if (!value) return "-";
  return value
    .toString()
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Maps a raw Complaint entity from the backend into the flat shape
// ComplaintRow / ComplaintDetailsModal expect.
function mapComplaint(raw) {
  return {
    id: raw.id,
    citizenName: raw.citizen?.name || "Unknown",
    issue: raw.issue,
    department: raw.department?.name || "Unassigned",
    priority: titleCase(raw.priority),
    status: raw.status,
    submittedOn: formatDate(raw.submittedOn),
    description: raw.description || "-",
    imageUrl: raw.imageUrl ? `${API_ORIGIN}${raw.imageUrl}` : null,
    latitude: raw.latitude,
    longitude: raw.longitude,
  };
}

// Fetches live complaints from the backend, supports search + filtering,
// and opens a modal with the full details of a selected complaint.
function ComplaintTable() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ department: "", priority: "", status: "" });

  const fetchComplaints = () => {
    setLoading(true);
    setError("");
    getAllComplaints()
      .then((res) => setComplaints(res.data.map(mapComplaint)))
      .catch(() =>
        setError("Could not load complaints. Is the backend running on port 8080?")
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchesQuery =
        !query ||
        c.id.toString().includes(query) ||
        c.citizenName.toLowerCase().includes(query.toLowerCase()) ||
        c.issue.toLowerCase().includes(query.toLowerCase());

      const matchesDepartment = !filters.department || c.department === filters.department;
      const matchesPriority = !filters.priority || c.priority === filters.priority;
      const matchesStatus =
        !filters.status || c.status === filters.status.toUpperCase().replace(/\s+/g, "_");

      return matchesQuery && matchesDepartment && matchesPriority && matchesStatus;
    });
  }, [complaints, query, filters]);

  return (
    <div className="complaint-table-container">
      <SearchFilter onSearch={setQuery} onFilterChange={handleFilterChange} />

      <div className="complaint-table-header">
        <h3>Complaint Management</h3>
        <span className="complaint-table-count">
          {loading ? "Loading..." : `${filteredComplaints.length} records`}
        </span>
      </div>

      {error && <p className="complaint-table-error">{error}</p>}

      {!loading && !error && filteredComplaints.length === 0 && (
        <p className="complaint-table-empty">No complaints match your search/filters.</p>
      )}

      {!loading && !error && filteredComplaints.length > 0 && (
        <table className="complaint-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Citizen</th>
              <th>Issue</th>
              <th>Department</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((complaint) => (
              <ComplaintRow
                key={complaint.id}
                complaint={complaint}
                onView={setSelectedComplaint}
              />
            ))}
          </tbody>
        </table>
      )}

     <ComplaintDetailsModal
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        onStatusUpdated={fetchComplaints}
      />
    </div>
  );
}

export default ComplaintTable;