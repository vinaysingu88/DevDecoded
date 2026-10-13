import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FiFileText, FiPlus, FiEdit2, FiEye } from "react-icons/fi";
import api from "../../api/axios";
import "./MyPosts.css";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchMyPosts() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/posts/my-posts/");
        const data = response.data;
        const postList = Array.isArray(data) ? data : data.results || [];

        if (active) setPosts(postList);
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.detail ||
              "Unable to load your posts. Please log in again if your session has expired."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchMyPosts();

    return () => {
      active = false;
    };
  }, []);

  const getStatusClass = (status) => {
    const value = (status || "pending").toLowerCase();
    return `my-post-status status-${value}`;
  };

  return (
    <section className="my-posts-page">
      <div className="my-posts-header">
        <div>
          <span className="my-posts-eyebrow">YOUR CONTENT</span>
          <h1>My Posts</h1>
          <p>Manage your articles and track their publication status.</p>
        </div>

        <Link to="/write" className="my-posts-create">
          <FiPlus /> Write a Post
        </Link>
      </div>

      <div className="my-posts-summary">
        <div className="my-post-summary-card">
          <span>Total posts</span>
          <strong>{posts.length}</strong>
        </div>

        <div className="my-post-summary-card">
          <span>Approved</span>
          <strong>
            {posts.filter((post) => post.status === "APPROVED").length}
          </strong>
        </div>

        <div className="my-post-summary-card">
          <span>Pending</span>
          <strong>
            {posts.filter((post) => post.status === "PENDING").length}
          </strong>
        </div>

        <div className="my-post-summary-card">
          <span>Rejected</span>
          <strong>
            {posts.filter((post) => post.status === "REJECTED").length}
          </strong>
        </div>
      </div>

      {loading && (
        <div className="my-posts-message">Loading your articles...</div>
      )}

      {!loading && error && (
        <div className="my-posts-message my-posts-error">
          {error}
          <button onClick={() => window.location.reload()}>Try again</button>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="my-posts-empty">
          <div className="my-posts-empty-icon">
            <FiFileText />
          </div>
          <h2>Your writing journey starts here</h2>
          <p>You haven't published or submitted any articles yet.</p>
          <Link to="/write" className="my-posts-create">
            <FiPlus /> Create your first post
          </Link>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="my-posts-list">
          {posts.map((post) => (
            <article className="my-post-item" key={post.id}>
              <div className="my-post-icon">
                <FiFileText />
              </div>

              <div className="my-post-details">
                <div className="my-post-title-row">
                  <h2>{post.title}</h2>
                  <span className={getStatusClass(post.status)}>
                    {(post.status || "PENDING").toLowerCase()}
                  </span>
                </div>

                <p className="my-post-excerpt">
                  {(post.content || "").slice(0, 150)}
                  {(post.content || "").length > 150 ? "..." : ""}
                </p>

                <span className="my-post-date">
                  Updated{" "}
                  {post.updated_at
                    ? new Date(post.updated_at).toLocaleDateString()
                    : post.created_at
                    ? new Date(post.created_at).toLocaleDateString()
                    : "recently"}
                </span>
              </div>

              <div className="my-post-actions">
                {post.status === "APPROVED" && (
                  <Link
                    to={`/post/${post.id}`}
                    className="my-post-action"
                    title="View article"
                  >
                    <FiEye />
                  </Link>
                )}

                <Link
                  to={`/write?edit=${post.id}`}
                  className="my-post-action"
                  title="Edit article"
                >
                  <FiEdit2 />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyPosts;