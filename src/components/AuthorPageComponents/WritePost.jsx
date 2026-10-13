import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { FiArrowLeft, FiFileText, FiSend } from "react-icons/fi";
import api from "../../api/axios";
import "./WritePost.css";

function WritePost() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loadingPost, setLoadingPost] = useState(Boolean(editId));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!editId) return;

    let active = true;

    async function loadPost() {
      try {
        setLoadingPost(true);
        const response = await api.get(`/api/posts/${editId}/`);

        if (active) {
          setTitle(response.data.title || "");
          setContent(response.data.content || "");
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.detail ||
              "Unable to load this article for editing."
          );
        }
      } finally {
        if (active) setLoadingPost(false);
      }
    }

    loadPost();

    return () => {
      active = false;
    };
  }, [editId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim() || !content.trim()) {
      setError("Please enter both a title and article content.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        title: title.trim(),
        content: content.trim(),
      };

      if (editId) {
        await api.patch(`/api/posts/${editId}/`, payload);
      } else {
        await api.post("/api/posts/", payload);
      }

      setSuccess(
        editId
          ? "Article updated successfully. It may need approval again."
          : "Article submitted successfully for review."
      );

      setTimeout(() => navigate("/my-posts"), 1200);
    } catch (err) {
      const data = err.response?.data;
      setError(
        data?.detail ||
          data?.title?.[0] ||
          data?.content?.[0] ||
          "Unable to save your article. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingPost) {
    return <div className="write-post-loading">Loading article...</div>;
  }

  return (
    <section className="write-post-page">
      <Link to="/my-posts" className="write-post-back">
        <FiArrowLeft /> Back to My Posts
      </Link>

      <header className="write-post-header">
        <span className="write-post-eyebrow">YOUR CREATIVE SPACE</span>
        <h1>{editId ? "Edit your article" : "Write something meaningful."}</h1>
        <p>
          Share your knowledge, document what you learn, and help other
          developers grow.
        </p>
      </header>

      <form className="write-post-form" onSubmit={handleSubmit}>
        <div className="write-post-form-heading">
          <div className="write-post-icon">
            <FiFileText />
          </div>
          <div>
            <h2>Article editor</h2>
            <p>Your article will be submitted for review.</p>
          </div>
        </div>

        {error && <div className="write-post-alert write-post-alert-error">{error}</div>}
        {success && (
          <div className="write-post-alert write-post-alert-success">
            {success}
          </div>
        )}

        <label htmlFor="article-title">Article title</label>
        <input
          id="article-title"
          type="text"
          placeholder="Give your article a clear, engaging title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          required
        />
        <div className="write-post-field-note">{title.length}/200 characters</div>

        <label htmlFor="article-content">Article content</label>
        <textarea
          id="article-content"
          placeholder="Start writing your ideas here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={16}
          required
        />
        <div className="write-post-field-note">
          {content.trim() ? content.trim().split(/\s+/).length : 0} words
        </div>

        <div className="write-post-footer">
          <p>Review your article before submitting.</p>
          <button type="submit" disabled={submitting}>
            <FiSend />
            {submitting
              ? "Submitting..."
              : editId
              ? "Save Changes"
              : "Submit for Review"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default WritePost;