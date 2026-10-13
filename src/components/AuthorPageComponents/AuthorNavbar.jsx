import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./AuthorNavbar.css";

function AuthorNavbar() {
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();

    const query = search.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  }

  function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login", { replace: true });
  }

  return (
    <header className="author-navbar">
      <div className="author-nav-inner">
        <Link to="/dashboard" className="author-brand">
         <img src="images/mainlogo.png" alt="logo" width={50}/>
          Dev<span>Decoded</span><b>.</b>
        </Link>

        <form className="author-search" onSubmit={handleSearch}>
          <FaSearch />
          <input
            type="search"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search articles"
          />
        </form>

        <div className="author-nav-actions">
          <button
            type="button"
            className="author-icon-btn mobile-menu-btn"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>

          <button
            type="button"
            className="author-icon-btn"
            aria-label="Notifications"
            title="Notifications"
            onClick={() => alert("Notifications will be available later.")}
          >
            <FaBell />
          </button>

          <div className="author-profile-wrap">
            <button
              type="button"
              className="author-profile-btn"
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <FaUserCircle />
              <span>Account</span>
            </button>

            {profileOpen && (
              <div className="author-profile-menu">
                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                >
                  <FaUser /> My Profile
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setProfileOpen(false)}
                >
                  <FaCog /> Settings
                </Link>

                <button type="button" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="author-mobile-search">
          <form className="author-search" onSubmit={handleSearch}>
            <FaSearch />
            <input
              type="search"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search articles"
            />
          </form>
        </div>
      )}
    </header>
  );
}

export default AuthorNavbar;
