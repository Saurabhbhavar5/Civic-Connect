import api from "./api";

// The backend serves uploaded images from its root (e.g. /uploads/xyz.jpg),
// not under /api, so this strips the /api suffix from the configured base URL.
const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";
export const API_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

export const getAllComplaints = () => api.get("/complaints");
export const getMyComplaints = () => api.get("/complaints/my");
export const getComplaintById = (id) => api.get(`/complaints/${id}`);
export const createComplaint = (formData) =>
  api.post("/complaints", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateComplaintStatus = (id, status) =>
  api.patch(`/complaints/${id}/status`, { status });
export const deleteComplaint = (id) => api.delete(`/complaints/${id}`);