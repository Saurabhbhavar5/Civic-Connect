import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { adminLogin } from "../api/authApi";
import "../components/user/Auth.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await adminLogin(form);
      localStorage.setItem("cc_token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        {error && <p className="auth-error">{error}</p>}
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
        <p className="auth-footer">
          New admin? <Link to="/admin/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default AdminLogin;
