
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaUsers,
  FaFileAlt,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaRegCalendarAlt,
} from "react-icons/fa";
import api from "../../api/axios";
import "./AdminDashboard.css";

function getListCount(data) {
  if (Array.isArray(data)) return data.length;
  if (typeof data?.count === "number") return data.count;
  if (Array.isArray(data?.results)) return data.results.length;
  return null;
}

function AdminDashboard() {
  const [stats, setStats] = useState({
    users: null,
    totalPosts: null,
    pending: null,
    approved: null,
  });

  const [loading, setLoading] = useState(true);
  const [statsError, setStatsError] = useState("");

  const loadStats = useCallback(async () => {
    setLoading(true);
    setStatsError("");

    const results = await Promise.allSettled([
      api.get("/api/admin/users/"),
      api.get("/api/posts/admin/pending/"),
      api.get("/api/public/posts/"),
    ]);

    const nextStats = {
      users: null,
      totalPosts: null,
      pending: null,
      approved: null,
    };

    const errors = [];

    if (results[0].status === "fulfilled") {
      nextStats.users = getListCount(results[0].value.data);
    } else {
      errors.push("users");
    }

    if (results[1].status === "fulfilled") {
      nextStats.pending = getListCount(results[1].value.data);
    } else {
      errors.push("pending posts");
    }

    if (results[2].status === "fulfilled") {
      nextStats.approved = getListCount(results[2].value.data);
    } else {
      errors.push("approved posts");
    }
    if (
  nextStats.pending !== null &&
  nextStats.approved !== null
) {
  nextStats.totalPosts = nextStats.pending + nextStats.approved;
}
    if (
  nextStats.pending !== null &&
  nextStats.approved !== null
) {
  nextStats.totalPosts = nextStats.pending + nextStats.approved;
}

    // Total posts cannot be calculated accurately without an
    // endpoint that returns all posts, including rejected posts.
    setStats(nextStats);

    if (errors.length) {
      setStatsError(`Unable to load: ${errors.join(", ")}.`);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const statCards = [
    {
      label: "Total Users",
      value: stats.users ?? "—",
      icon: <FaUsers />,
      color: "blue",
      note: "Registered members",
    },
    {
      label: "Total Articles",
      value: stats.totalPosts ?? "—",
      icon: <FaFileAlt />,
      color: "purple",
      note: "All submissions",
    },
    {
      label: "Pending Review",
      value: stats.pending ?? "—",
      icon: <FaClock />,
      color: "orange",
      note: "Awaiting approval",
    },
    {
      label: "Published Articles",
      value: stats.approved ?? "—",
      icon: <FaCheckCircle />,
      color: "green",
      note: "Approved content",
    },
  ];

  return (
    <div className="admin-dashboard">
      <header className="admin-page-header">
        <div>
          <div className="admin-eyebrow">
            <FaShieldAlt /> ADMINISTRATION
          </div>

          <h1>Dashboard Overview</h1>

          <p>
            Manage your community, review articles, and keep DevDecoded
            running smoothly.
          </p>
        </div>

        <button
          type="button"
          className="admin-date admin-refresh-stats"
          onClick={loadStats}
          disabled={loading}
        >
          <FaRegCalendarAlt />
          <span>{loading ? "Refreshing..." : "Refresh statistics"}</span>
        </button>
      </header>

      {statsError && (
        <div className="admin-post-error" role="alert">
          {statsError}
        </div>
      )}

      <section className="admin-stats-grid">
        {statCards.map((stat) => (
          <article className="admin-stat-card" key={stat.label}>
            <div className={`admin-stat-icon ${stat.color}`}>
              {stat.icon}
            </div>

            <div className="admin-stat-info">
              <p>{stat.label}</p>
              <h2>{loading && stat.value === "—" ? "..." : stat.value}</h2>
              <span>{stat.note}</span>
            </div>

            <div className={`admin-stat-indicator ${stat.color}`} />
          </article>
        ))}
      </section>

      <section className="admin-content-grid">
        <div className="admin-panel admin-moderation-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Pending Articles</h2>
              <p>Review submissions before they go live.</p>
            </div>

            <span className="admin-panel-icon">
              <FaClock />
            </span>
          </div>

          <div className="admin-empty-state">
            <div className="admin-empty-icon">
              <FaFileAlt />
            </div>

            <h3>
              {stats.pending === 0
                ? "No pending articles"
                : stats.pending === null
                  ? "Moderation queue"
                  : `${stats.pending} articles awaiting review`}
            </h3>

            <p>
              {stats.pending === 0
                ? "You're all caught up. New submissions will appear here."
                : "Review pending submissions and update their publication status."}
            </p>

            <Link to="/admin/posts" className="admin-review-link">
              Review articles <FaArrowRight />
            </Link>
          </div>
        </div>

        <div className="admin-panel admin-quick-panel">
          <div className="admin-panel-header">
            <div>
              <h2>Quick Actions</h2>
              <p>Jump to an administration task.</p>
            </div>
          </div>

          <div className="admin-quick-actions">
            <Link to="/admin/posts" className="admin-action-link">
              <span className="admin-action-icon orange">
                <FaFileAlt />
              </span>

              <span className="admin-action-text">
                <strong>Review Articles</strong>
                <small>Approve or reject submissions</small>
              </span>

              <FaArrowRight className="admin-action-arrow" />
            </Link>

            <Link to="/admin/users" className="admin-action-link">
              <span className="admin-action-icon blue">
                <FaUsers />
              </span>

              <span className="admin-action-text">
                <strong>Manage Users</strong>
                <small>View community members</small>
              </span>

              <FaArrowRight className="admin-action-arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="admin-bottom-banner">
        <div className="admin-banner-icon">
          <FaShieldAlt />
        </div>

        <div>
          <h3>Community first, always.</h3>
          <p>
            Keep content useful, respectful, and valuable for every
            DevDecoded reader.
          </p>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
