import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userLogin } from "../../api/authApi";
import "./Auth.css";

function UserLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await userLogin(form);
      localStorage.setItem("cc_token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Citizen Login</h2>
        {error && <p className="auth-error">{error}</p>}
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>
        <p className="auth-footer">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
        <p className="auth-footer">
          Are you an admin? <Link to="/admin/login">Admin Login</Link>
        </p>
      </form>
    </div>
  );
}

export default UserLogin;
