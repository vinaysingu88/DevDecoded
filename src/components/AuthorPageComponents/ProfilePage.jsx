import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FiUser,
  FiMail,
  FiShield,
  FiCalendar,
  FiEdit2,
  FiFileText,
} from "react-icons/fi";
import api from "../../api/axios";
import "./ProfilePage.css";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        // Uses the existing authenticated users endpoint.
        const response = await api.get("/api/auth/me/");

        if (active) setProfile(response.data);
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.detail ||
              "Unable to load your profile. Check your authentication API endpoint."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="profile-message">Loading your profile...</div>;
  }

  if (error || !profile) {
    return (
      <div className="profile-message profile-error">
        <p>{error || "Profile information is unavailable."}</p>
        <Link to="/dashboard">Back to dashboard</Link>
      </div>
    );
  }

  const name = profile.name || profile.username || "Author";
  const email = profile.email || "Email not available";
  const role = profile.role || "AUTHOR";

  return (
    <section className="profile-page">
      <header className="profile-page-heading">
        <span className="profile-eyebrow">YOUR ACCOUNT</span>
        <h1>My Profile</h1>
        <p>Manage and review your DevDecoded account information.</p>
      </header>

      <div className="profile-card">
        <div className="profile-cover" />

        <div className="profile-main">
          <div className="profile-avatar">
            <FiUser />
          </div>

          <div className="profile-identity">
            <h2>{name}</h2>
            <p>{email}</p>
            <span className="profile-role">
              <FiShield />
              {role}
            </span>
          </div>
        </div>

        <div className="profile-divider" />

        <div className="profile-details-heading">
          <h3>Account information</h3>
          <p>Your registered account details.</p>
        </div>

        <div className="profile-details-grid">
          <div className="profile-detail">
            <span className="profile-detail-icon"><FiUser /></span>
            <div>
              <small>Full name</small>
              <strong>{name}</strong>
            </div>
          </div>

          <div className="profile-detail">
            <span className="profile-detail-icon"><FiMail /></span>
            <div>
              <small>Email address</small>
              <strong>{email}</strong>
            </div>
          </div>

          <div className="profile-detail">
            <span className="profile-detail-icon"><FiShield /></span>
            <div>
              <small>Account role</small>
              <strong>{role}</strong>
            </div>
          </div>

          {profile.created_at && (
            <div className="profile-detail">
              <span className="profile-detail-icon"><FiCalendar /></span>
              <div>
                <small>Member since</small>
                <strong>
                  {new Date(profile.created_at).toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
                </strong>
              </div>
            </div>
          )}
        </div>

        <div className="profile-actions">
          <Link to="/my-posts" className="profile-secondary-button">
            <FiFileText /> My Posts
          </Link>

          <Link to="/write" className="profile-primary-button">
            <FiEdit2 /> Write an Article
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;