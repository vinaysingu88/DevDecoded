import React, { useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaFileAlt,
  FaCheck,
  FaTimes,
  FaTrash,
  FaSyncAlt,
} from "react-icons/fa";
import api from "../../api/axios";
import "./AdminPostsPage.css";

function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState(null);
  const [notice, setNotice] = useState("");

  const fetchPendingPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/api/posts/admin/pending/");
      const data = response.data;
      const list = Array.isArray(data) ? data : data.results || [];
      setPosts(list);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to load pending posts. Check your admin permissions and API.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    const query = searchId.trim();
    if (!query) return posts;

    return posts.filter((post) => String(post.id) === query);
  }, [posts, searchId]);

  const updateStatus = async (postId, status) => {
    const action = status === "APPROVED" ? "approve" : "reject";

    if (
      !window.confirm(`Are you sure you want to ${action} post #${postId}?`)
    ) {
      return;
    }

    setActionId(postId);
    setError("");
    setNotice("");

    try {
      await api.put(`/api/posts/admin/${postId}/status/`, {
        status,
      });

      setPosts((current) => current.filter((post) => post.id !== postId));

      setNotice(`Post #${postId} ${action}d successfully.`);
    } catch (err) {
      setError(err.response?.data?.detail || `Unable to ${action} this post.`);
    } finally {
      setActionId(null);
    }
  };

  const deletePost = async (postId) => {
    if (!window.confirm(`Permanently delete post #${postId}?`)) return;

    setActionId(postId);
    setError("");
    setNotice("");

    try {
      await api.delete(`/api/posts/admin/${postId}/`);
      setPosts((current) => current.filter((post) => post.id !== postId));
      setNotice(`Post #${postId} deleted successfully.`);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to delete this post. Check the admin delete endpoint.",
      );
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="admin-posts-page">
      <header className="admin-posts-header">
        <div>
          <span className="admin-posts-eyebrow">CONTENT MANAGEMENT</span>
          <h1>Posts & Moderation</h1>
          <p>Review articles before they are published on DevDecoded.</p>
        </div>

        <button
          type="button"
          className="admin-refresh-button"
          onClick={fetchPendingPosts}
          disabled={loading || actionId !== null}
        >
          <FaSyncAlt className={loading ? "admin-spin" : ""} />
          Refresh
        </button>
      </header>

      <section className="admin-posts-summary">
        <div className="admin-posts-summary-icon">
          <FaFileAlt />
        </div>
        <div>
          <span>Pending review</span>
          <strong>{loading ? "—" : posts.length}</strong>
        </div>
        <span className="admin-pending-pill">Needs attention</span>
      </section>

      <section className="admin-posts-panel">
        <div className="admin-posts-panel-header">
          <div>
            <h2>Pending submissions</h2>
            <p>Search by the exact post ID to find a submission.</p>
          </div>

          <div className="admin-post-search">
            <FaSearch />
            <input
              type="text"
              inputMode="numeric"
              placeholder="Search post ID..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value.replace(/\D/g, ""))}
              aria-label="Search posts by ID"
            />
            {searchId && (
              <button
                type="button"
                onClick={() => setSearchId("")}
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {notice && <div className="admin-post-notice">{notice}</div>}
        {error && <div className="admin-post-error">{error}</div>}

        {loading ? (
          <div className="admin-posts-state">
            <div className="admin-loader" />
            <p>Loading pending submissions...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="admin-posts-state">
            <span className="admin-posts-empty-icon">
              <FaFileAlt />
            </span>
            <h3>
              {searchId ? "No matching pending post" : "No pending submissions"}
            </h3>
            <p>
              {searchId
                ? "Try another post ID or clear the search."
                : "You're all caught up. New submissions will appear here."}
            </p>
          </div>
        ) : (
          <div className="admin-post-table-wrap">
            <table className="admin-post-table">
              <thead>
                <tr>
                  <th>Post</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <div className="admin-post-title-cell">
                        <span className="admin-post-id">#{post.id}</span>
                        <strong>{post.title || "Untitled post"}</strong>
                      </div>
                    </td>

                    <td>
                      {typeof post.author === "object"
                        ? post.author?.name ||
                          post.author?.email ||
                          "Unknown author"
                        : post.author_name || post.author || "Unknown author"}
                    </td>

                    <td>
                      <span className="admin-status-badge pending">
                        Pending
                      </span>
                    </td>

                    <td>
                      {post.created_at
                        ? new Date(post.created_at).toLocaleDateString()
                        : "—"}
                    </td>

                    <td>
                      <div className="admin-post-actions">
                        <button
                          type="button"
                          className="admin-post-action approve"
                          onClick={() => updateStatus(post.id, "APPROVED")}
                          disabled={actionId !== null}
                          title="Approve post"
                          aria-label={`Approve post ${post.id}`}
                        >
                          <FaCheck />
                        </button>

                        <button
                          type="button"
                          className="admin-post-action reject"
                          onClick={() => updateStatus(post.id, "REJECTED")}
                          disabled={actionId !== null}
                          title="Reject post"
                          aria-label={`Reject post ${post.id}`}
                        >
                          <FaTimes />
                        </button>

                        <button
                          type="button"
                          className="admin-post-action delete"
                          onClick={() => deletePost(post.id)}
                          disabled={actionId !== null}
                          title="Delete post"
                          aria-label={`Delete post ${post.id}`}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && posts.length > 0 && (
          <footer className="admin-posts-footer">
            Showing {filteredPosts.length} of {posts.length} pending posts
          </footer>
        )}
      </section>
    </div>
  );
}

export default AdminPostsPage;
