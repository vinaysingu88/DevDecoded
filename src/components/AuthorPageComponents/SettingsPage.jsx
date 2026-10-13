import React, { useState } from "react";
import { Link } from "react-router";
import {
  FiSettings,
  FiUser,
  FiBell,
  FiMoon,
  FiSun,
  FiShield,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";
import "./SettingsPage.css";

function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [articleUpdates, setArticleUpdates] = useState(true);
  const [appearance, setAppearance] = useState("light");

  function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/login";
  }

  return (
    <section className="settings-page">
      <header className="settings-header">
        <span className="settings-eyebrow">PERSONALIZE YOUR SPACE</span>
        <h1>Settings</h1>
        <p>Manage your preferences and customize your DevDecoded experience.</p>
      </header>

      <div className="settings-section">
        <div className="settings-section-heading">
          <span className="settings-heading-icon"><FiUser /></span>
          <div>
            <h2>Account</h2>
            <p>Manage your account information.</p>
          </div>
        </div>

        <Link to="/profile" className="settings-row">
          <span className="settings-row-icon"><FiUser /></span>
          <span className="settings-row-content">
            <strong>My Profile</strong>
            <small>View your profile information</small>
          </span>
          <FiChevronRight className="settings-chevron" />
        </Link>

        <div className="settings-row">
          <span className="settings-row-icon"><FiShield /></span>
          <span className="settings-row-content">
            <strong>Account security</strong>
            <small>Password and security options can be added later.</small>
          </span>
          <span className="settings-coming-soon">Coming soon</span>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-heading">
          <span className="settings-heading-icon"><FiBell /></span>
          <div>
            <h2>Notifications</h2>
            <p>Choose which updates you want to receive.</p>
          </div>
        </div>

        <div className="settings-row">
          <span className="settings-row-content">
            <strong>Email notifications</strong>
            <small>Receive important updates by email.</small>
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={emailNotifications}
            className={`settings-toggle ${emailNotifications ? "enabled" : ""}`}
            onClick={() => setEmailNotifications((value) => !value)}
          >
            <span />
          </button>
        </div>

        <div className="settings-row">
          <span className="settings-row-content">
            <strong>Article updates</strong>
            <small>Keep track of updates to your articles.</small>
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={articleUpdates}
            className={`settings-toggle ${articleUpdates ? "enabled" : ""}`}
            onClick={() => setArticleUpdates((value) => !value)}
          >
            <span />
          </button>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-heading">
          <span className="settings-heading-icon">
            {appearance === "light" ? <FiSun /> : <FiMoon />}
          </span>
          <div>
            <h2>Appearance</h2>
            <p>Choose your preferred appearance.</p>
          </div>
        </div>

        <div className="settings-appearance-options">
          <button
            type="button"
            className={`settings-appearance-option ${
              appearance === "light" ? "selected" : ""
            }`}
            onClick={() => setAppearance("light")}
          >
            <FiSun />
            <span>Light</span>
          </button>

          <button
            type="button"
            className={`settings-appearance-option ${
              appearance === "dark" ? "selected" : ""
            }`}
            onClick={() => setAppearance("dark")}
          >
            <FiMoon />
            <span>Dark</span>
          </button>
        </div>
        <p className="settings-note">
          Appearance selection is currently a UI preference and does not yet
          change the entire website theme.
        </p>
      </div>

      <div className="settings-logout-section">
        <div>
          <h3>Sign out</h3>
          <p>Sign out of your current DevDecoded session on this device.</p>
        </div>

        <button
          type="button"
          className="settings-logout-button"
          onClick={handleLogout}
        >
          <FiLogOut /> Log out
        </button>
      </div>
    </section>
  );
}

export default SettingsPage;