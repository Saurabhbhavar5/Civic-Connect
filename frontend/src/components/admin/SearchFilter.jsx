import React, { useState } from "react";
import "./SearchFilter.css";

// Provides a search box and dropdown filters to search/filter complaints.
function SearchFilter({ onSearch = () => {}, onFilterChange = () => {} }) {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        className="search-filter-input"
        placeholder="Search by Complaint ID, Citizen Name, or Issue"
        value={query}
        onChange={handleSearchChange}
      />
      <select
        className="search-filter-select"
        onChange={(e) => onFilterChange("department", e.target.value)}
      >
        <option value="">All Departments</option>
        <option value="Sanitation">Sanitation</option>
        <option value="Roads">Roads</option>
        <option value="Water Supply">Water Supply</option>
        <option value="Electricity">Electricity</option>
      </select>
      <select
        className="search-filter-select"
        onChange={(e) => onFilterChange("priority", e.target.value)}
      >
        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <select
        className="search-filter-select"
        onChange={(e) => onFilterChange("status", e.target.value)}
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
}

export default SearchFilter;
