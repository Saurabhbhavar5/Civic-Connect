import React, { useState, useRef } from "react";
import { createComplaint } from "../../api/complaintApi";
import "./SubmitComplaint.css";

function SubmitComplaint() {
  const [form, setForm] = useState({
    issue: "",
    department: "Sanitation",
    priority: "Medium",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [location, setLocation] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImage(null);
      setImagePreview(null);
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Location isn't supported by this browser.");
      return;
    }
    setLocating(true);
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocating(false);
      },
      (err) => {
        setLocationError(
          err.code === err.PERMISSION_DENIED
            ? "Location permission was denied. You can still submit without it."
            : "Couldn't get your location. You can still submit without it."
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const resetForm = () => {
    setForm({ issue: "", department: "Sanitation", priority: "Medium", description: "" });
    setImage(null);
    setImagePreview(null);
    setLocation(null);
    setLocationError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("issue", form.issue);
      formData.append("description", form.description);
      formData.append("department", form.department);
      formData.append("priority", form.priority.toUpperCase());
      if (location) {
        formData.append("latitude", location.latitude);
        formData.append("longitude", location.longitude);
      }
      if (image) {
        formData.append("image", image);
      }

      await createComplaint(formData);
      setSubmitted(true);
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit complaint.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="submit-complaint">
      <h3>Submit a Complaint</h3>
      {submitted && <p className="submit-complaint-success">Complaint submitted successfully!</p>}
      {error && <p className="submit-complaint-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Issue Title</label>
        <input type="text" name="issue" value={form.issue} onChange={handleChange} required />

        <label>Department</label>
        <select name="department" value={form.department} onChange={handleChange}>
          <option>Sanitation</option>
          <option>Roads</option>
          <option>Water Supply</option>
          <option>Electricity</option>
        </select>

        <label>Priority</label>
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label>Description</label>
        <textarea name="description" rows="4" value={form.description} onChange={handleChange} required />

        <label>Photo (optional)</label>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img className="submit-complaint-preview" src={imagePreview} alt="Complaint preview" />
        )}

        <label>Location (optional)</label>
        <div className="submit-complaint-location-row">
          <button type="button" onClick={handleUseLocation} disabled={locating}>
            {locating ? "Getting location..." : location ? "Location captured ✓" : "Use My Location"}
          </button>
          {location && (
            <span className="submit-complaint-coords">
              {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
            </span>
          )}
        </div>
        {locationError && <p className="submit-complaint-location-error">{locationError}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
}

export default SubmitComplaint;