import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import "./FeedSection.css";
import api from "../../api/axios";

function FeedSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchPosts() {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/public/posts/");

        const data = response.data;
        const postList = Array.isArray(data)
          ? data
          : data.results || [];

        if (active) {
          setPosts(postList);
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.detail ||
              err.message ||
              "Unable to load articles."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="author-feed">
      <div className="feed-heading">
        <div>
          <span className="feed-eyebrow">THE COMMUNITY</span>
          <h2>Latest Articles</h2>
          <p>Fresh ideas and perspectives from our writers.</p>
        </div>
      </div>

      {loading && (
        <div className="feed-message">
          <span className="feed-spinner" />
          <p>Discovering great articles...</p>
        </div>
      )}

      {!loading && error && (
        <div className="feed-message feed-error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="feed-empty">
          <h3>No articles yet</h3>
          <p>
            Check back soon for fresh ideas from the community.
          </p>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="feed-posts">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}

export default FeedSection;
