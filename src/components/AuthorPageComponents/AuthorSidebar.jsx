import React from "react";
import { NavLink, Link } from "react-router";
import {
  FaHome,
  FaFileAlt,
  FaPenNib,
  FaUserCircle,
  FaLightbulb,
  FaArrowRight,
  FaSearch 
} from "react-icons/fa";
import "./AuthorSidebar.css";

const navItems = [
{ label: "Home", path: "/Home", icon: <FaHome /> },
{ label: "My Posts", path: "/my-posts", icon: <FaFileAlt /> },
{ label: "My Profile", path: "/profile", icon: <FaUserCircle /> },
{ label: "Write a Post", path: "/write", icon: <FaPenNib /> },
{ label: "Search article", path: "/search", icon: <FaSearch /> },
];

function AuthorSidebar() {
  return (
    <aside className="author-sidebar">
      <div className="sidebar-section-label">MENU</div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/Home"}
            className={({ isActive }) =>
              `sidebar-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>


      <div className="sidebar-divider" />

      <div className="sidebar-tip">
        <div className="sidebar-tip-icon">
          <FaLightbulb />
        </div>

        <h4>Keep sharing ideas</h4>

        <p>
          Every great article starts with a thought worth sharing.
        </p>

        <Link to="/write">
          Start writing <FaArrowRight />
        </Link>
      </div>

      <div className="sidebar-footer">
        <span>DevDecoded</span>
        <span>Ideas worth sharing.</span>
      </div>
    </aside>
  );
}

export default AuthorSidebar;