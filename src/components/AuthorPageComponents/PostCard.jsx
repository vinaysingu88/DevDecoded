
import React from "react";
import { Link } from "react-router";
import {
  FaUserCircle,
  FaRegClock,
  FaArrowUp,
  FaArrowDown,
  FaShareAlt,
} from "react-icons/fa";
import "./PostCard.css";

function PostCard({ post }) {
  const title = post.title || "Untitled article";
  const content = post.content || "";

  const authorName =
    post.author_name ||
    post.author?.name ||
    (typeof post.author === "string" ? post.author : null) ||
    "Community Author";

  const createdAt = post.created_at
    ? new Date(post.created_at)
    : null;

  const validDate =
    createdAt && !Number.isNaN(createdAt.getTime());

  const upvotes = post.upvote_count ?? 0;
  const downvotes = post.downvote_count ?? 0;
  const shares = post.share_count ?? 0;

  const wordCount = content.trim()
    ? content.trim().split(/\s+/).length
    : 0;

  const readingMinutes = Math.max(
    1,
    Math.ceil(wordCount / 200)
  );

  const excerpt =
    content.length > 220
      ? `${content.slice(0, 220).trim()}...`
      : content;

  return (
    <article className="post-card">
      <div className="post-card-header">
        <div className="post-author-avatar">
          <FaUserCircle />
        </div>

        <div className="post-author-info">
          <h3>{authorName}</h3>

          <div className="post-meta">
            {validDate && (
              <span>
                {createdAt.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}

            <span className="post-reading-time">
              <FaRegClock />
              {readingMinutes} min read
            </span>
          </div>
        </div>
      </div>

      <div className="post-card-content">
        <h2>{title}</h2>
        <p>{excerpt}</p>

        <Link
          to={`/post/${post.id}`}
          className="post-read-more"
        >
          Read article <span>→</span>
        </Link>
      </div>

      {post.tags?.length > 0 && (
        <div className="post-tags">
          {post.tags.map((tag) => (
            <span
              key={typeof tag === "string" ? tag : tag.id}
            >
              #{typeof tag === "string" ? tag : tag.name}
            </span>
          ))}
        </div>
      )}

      <div className="post-card-footer">
        <div className="post-engagement">
          <span title="Upvotes">
            <FaArrowUp className="post-upvote-icon" />
            {upvotes}
          </span>

          <span title="Downvotes">
            <FaArrowDown className="post-downvote-icon" />
            {downvotes}
          </span>

          <span title="Shares">
            <FaShareAlt />
            {shares}
          </span>
        </div>

        <span className="post-card-brand">
          DevDecoded
        </span>
      </div>
    </article>
  );
}

export default PostCard;
