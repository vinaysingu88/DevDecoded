import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import {
  FaShieldAlt,
  FaThLarge,
  FaFileAlt,
  FaUsers,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import "./AdminLayout.css";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  const navItems = [
    {
      label: "Overview",
      path: "/admin/dashboard",
      icon: <FaThLarge />,
    },
    {
      label: "Posts & Moderation",
      path: "/admin/posts",
      icon: <FaFileAlt />,
    },
    {
      label: "User Management",
      path: "/admin/users",
      icon: <FaUsers />,
    },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link to="/admin/dashboard" className="admin-brand">
          <span className="admin-brand-icon">
            <FaShieldAlt />
          </span>
          <span>
            <strong>DevDecoded</strong>
            <small>Admin Console</small>
          </span>
        </Link>

        <div className="admin-sidebar-label">WORKSPACE</div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-security-card">
            <FaShieldAlt />
            <strong>Administrator access</strong>
            <p>Manage content and maintain community standards.</p>
          </div>

          <button
            type="button"
            className="admin-logout-button"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="admin-main-area">
        <header className="admin-topbar">
          <div className="admin-topbar-title">
            <span className="admin-topbar-icon">
              <FaBars />
            </span>
            <div>
              <strong>Admin Workspace</strong>
              <small>DevDecoded platform management</small>
            </div>
          </div>

          <div className="admin-account">
            <span className="admin-account-avatar">
              <FaShieldAlt />
            </span>
            <div>
              <strong>Administrator</strong>
              <small>Admin account</small>
            </div>
          </div>
        </header>

        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
