import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  FiArrowLeft,
  FiClock,
  FiCalendar,
  FiUser,
  FiThumbsUp,
  FiThumbsDown,
  FiShare2,
} from "react-icons/fi";
import api from "../../api/axios";
import "./PostDetail.css";

function PostDetail() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [voteLoading, setVoteLoading] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [myVote, setMyVote] = useState(null);

  useEffect(() => {
    let active = true;

    async function fetchPost() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/api/public/posts/${postId}/`
        );

        if (active) setPost(response.data);
      } catch (err) {
        if (active) {
          setError(
            err.response?.status === 404
              ? "This article could not be found or is no longer available."
              : err.response?.data?.detail ||
                  "Unable to load this article. Please try again."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchPost();

    return () => {
      active = false;
    };
  }, [postId]);

  async function handleVote(voteType) {
    if (voteLoading) return;

    setVoteLoading(true);
    setMessage("");

    try {
      const response = await api.post(
        `/api/public/posts/${postId}/vote/`,
        { vote_type: voteType }
      );

      setPost((current) => ({
        ...current,
        ...response.data,
      }));

      setMyVote(voteType);
      setMessage("Your vote has been recorded.");
    } catch (err) {
      setMessage(
        err.response?.data?.detail ||
          "Unable to record your vote. Please log in and try again."
      );
    } finally {
      setVoteLoading(false);
    }
  }

  async function handleShare() {
    if (shareLoading) return;

    setShareLoading(true);
    setMessage("");

    try {
      const shareUrl = window.location.href;

      // Track the share using the backend.
      const response = await api.post(
        `/api/public/posts/${postId}/share/`
      );

      setPost((current) => ({
        ...current,
        ...response.data,
      }));

      // Share through the device/browser, or copy the link.
      if (navigator.share) {
        try {
          await navigator.share({
            title: post.title,
            url: shareUrl,
          });
        } catch (err) {
          if (err.name !== "AbortError") {
            setMessage("Share count updated, but sharing was cancelled or unavailable.");
          }
          return;
        }
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setMessage("Article link copied!");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.detail ||
          "Unable to share this article right now."
      );
    } finally {
      setShareLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="post-detail-message">
        Loading article...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="post-detail-message">
        <h2>Article unavailable</h2>
        <p>{error || "This article could not be found."}</p>
        <Link to="/Home" className="post-detail-back">
          <FiArrowLeft /> Back to articles
        </Link>
      </div>
    );
  }

  const authorName =
    post.author_name ||
    post.author?.name ||
    post.author ||
    "DevDecoded Author";

  const publishedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Recently published";

  const wordCount = (post.content || "").trim()
    ? post.content.trim().split(/\s+/).length
    : 0;

  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="post-detail-page">
      <Link to="/Home" className="post-detail-back">
        <FiArrowLeft /> Back to articles
      </Link>

      <header className="post-detail-header">
        <span className="post-detail-eyebrow">
          DECODED STORIES
        </span>

        <h1>{post.title}</h1>

        <div className="post-detail-meta">
          <div className="post-detail-author">
            <span className="post-detail-avatar">
              <FiUser />
            </span>
            <div>
              <span className="post-detail-meta-label">
                Written by
              </span>
              <strong>{authorName}</strong>
            </div>
          </div>

          <div className="post-detail-meta-item">
            <FiCalendar />
            <span>{publishedDate}</span>
          </div>

          <div className="post-detail-meta-item">
            <FiClock />
            <span>{readingTime} min read</span>
          </div>
        </div>
      </header>

      <div className="post-detail-divider" />

      <div className="post-detail-content">
        {(post.content || "").split(/\n+/).map((paragraph, index) =>
          paragraph.trim() ? (
            <p key={index}>{paragraph}</p>
          ) : null
        )}
      </div>

      <section className="post-engagement">
        <div className="post-engagement-heading">
          <h3>Enjoyed this article?</h3>
          <p>Share your feedback with the community.</p>
        </div>

        <div className="post-engagement-actions">
          <button
            type="button"
            className={`engagement-button ${myVote === "UP" ? "is-selected" : ""}`}
            onClick={() => handleVote("UP")}
            disabled={voteLoading}
          >
            <FiThumbsUp />
            <span>Upvote</span>
            <strong>{post.upvote_count ?? 0}</strong>
          </button>

          <button
            type="button"
            className={`engagement-button ${myVote === "DOWN" ? "is-selected" : ""}`}
            onClick={() => handleVote("DOWN")}
            disabled={voteLoading}
          >
            <FiThumbsDown />
            <span>Downvote</span>
            <strong>{post.downvote_count ?? 0}</strong>
          </button>

          <button
            type="button"
            className="engagement-button"
            onClick={handleShare}
            disabled={shareLoading}
          >
            <FiShare2 />
            <span>{shareLoading ? "Sharing..." : "Share"}</span>
            <strong>{post.share_count ?? 0}</strong>
          </button>
        </div>

        {message && (
          <p className="post-engagement-message" role="status">
            {message}
          </p>
        )}
      </section>

      <footer className="post-detail-footer">
        <div>
          <h3>Keep exploring</h3>
          <p>
            Discover more ideas and insights from the
            DevDecoded community.
          </p>
        </div>

        <Link to="/Home" className="post-detail-explore">
          Explore articles
        </Link>
      </footer>
    </article>
  );
}

export default PostDetail;
