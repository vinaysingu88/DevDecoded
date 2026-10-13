import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaUserShield,
  FaPenNib,
} from "react-icons/fa";
import api from "../api/axios";
import "./AuthPages.css";

function LoginPage() {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("AUTHOR");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/api/auth/login/", form);
      const data = response.data;

      // The backend must return the authenticated user's role.
      const role = data.user?.role ?? data.role;

      if (!role) {
        setError(
          "Your login response does not include a user role. Please update the login API."
        );
        return;
      }

      if (role !== loginType) {
        setError(
          `This account is not registered as an ${loginType === "ADMIN" ? "admin" : "author"}. Please select the correct login option.`
        );
        return;
      }

      if (data.access) {
        localStorage.setItem("access", data.access);
      }

      if (data.refresh) {
        localStorage.setItem("refresh", data.refresh);
      }

      localStorage.setItem("role", role);

      navigate(
        role === "ADMIN" ? "/admin/dashboard" : "/Home",
        { replace: true }
      );
    } catch (err) {
      const details = err.response?.data;

      setError(
        details?.detail ||
          details?.error ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-brand">
          <span className="auth-brand-icon">D</span>
          DevDecoded
        </Link>

        <div className="auth-heading">
          <span className="auth-eyebrow">WELCOME BACK</span>
          <h1>Sign in to DevDecoded</h1>
          <p>Choose your account type to continue.</p>
        </div>

        <div className="login-type-options">
          <button
            type="button"
            className={`login-type-card ${
              loginType === "AUTHOR" ? "selected" : ""
            }`}
            onClick={() => {
              setLoginType("AUTHOR");
              setError("");
            }}
          >
            <span className="login-type-icon author-icon">
              <FaPenNib />
            </span>
            <span className="login-type-text">
              <strong>Author Login</strong>
              <small>Write and manage articles</small>
            </span>
            <span className="login-type-radio" />
          </button>

          <button
            type="button"
            className={`login-type-card ${
              loginType === "ADMIN" ? "selected" : ""
            }`}
            onClick={() => {
              setLoginType("ADMIN");
              setError("");
            }}
          >
            <span className="login-type-icon admin-icon">
              <FaUserShield />
            </span>
            <span className="login-type-text">
              <strong>Admin Login</strong>
              <small>Manage users and articles</small>
            </span>
            <span className="login-type-radio" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <label htmlFor="password">Password</label>

          <div className="auth-password-wrap">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="auth-eye"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading
              ? "Signing in..."
              : `Sign in as ${loginType === "ADMIN" ? "Admin" : "Author"}`}
            {!loading && <FaArrowRight />}
          </button>
        </form>

        {loginType === "AUTHOR" && (
          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        )}

        {loginType === "ADMIN" && (
          <p className="auth-admin-note">
            Admin accounts are created by the Django administrator.
            Registration is not available for admins.
          </p>
        )}

        <Link to="/" className="auth-back-home">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;