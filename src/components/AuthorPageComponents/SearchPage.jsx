import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { FiSearch, FiClock, FiArrowUpRight } from "react-icons/fi";
import api from "../../api/axios";
import "./SearchPage.css";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [input, setInput] = useState(query);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setInput(query);
  }, [query]);

  useEffect(() => {
    let active = true;

    async function searchPosts() {
      if (!query.trim()) {
        setPosts([]);
        setError("");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/public/posts/", {
          params: { search: query.trim() },
        });

        const data = response.data;
        const results = Array.isArray(data) ? data : data.results || [];

        if (active) setPosts(results);
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.detail || "Unable to search articles right now."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    searchPosts();

    return () => {
      active = false;
    };
  }, [query]);

  function handleSearch(event) {
    event.preventDefault();
    const value = input.trim();

    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  }

  return (
    <section className="search-page">
      <header className="search-page-header">
        <span className="search-page-eyebrow">DISCOVER SOMETHING NEW</span>
        <h1>Find your next idea.</h1>
        <p>Explore articles, tutorials, and ideas shared by developers.</p>
      </header>

      <form className="search-page-form" onSubmit={handleSearch}>
        <FiSearch className="search-page-icon" />
        <input
          type="search"
          placeholder="Search articles by title..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          aria-label="Search articles"
        />
        <button type="submit">Search</button>
      </form>

      {query && (
        <div className="search-results-heading">
          <h2>Results for "{query}"</h2>
          {!loading && !error && (
            <span>{posts.length} result{posts.length === 1 ? "" : "s"} on this page</span>
          )}
        </div>
      )}

      {!query && (
        <div className="search-empty">
          <FiSearch />
          <h2>What would you like to learn?</h2>
          <p>Enter a topic or article title to get started.</p>
        </div>
      )}

      {loading && <div className="search-message">Searching articles...</div>}

      {!loading && error && (
        <div className="search-message search-error">{error}</div>
      )}

      {!loading && !error && query && posts.length === 0 && (
        <div className="search-empty">
          <FiSearch />
          <h2>No articles found</h2>
          <p>Try another search term or a broader topic.</p>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="search-results-list">
          {posts.map((post) => {
            const wordCount = (post.content || "").trim()
              ? post.content.trim().split(/\s+/).length
              : 0;

            const readingTime = Math.max(1, Math.ceil(wordCount / 200));

            return (
              <article className="search-result-card" key={post.id}>
                <div className="search-result-content">
                  <span className="search-result-label">ARTICLE</span>
                  <h3>
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p>
                    {(post.content || "").slice(0, 180)}
                    {(post.content || "").length > 180 ? "..." : ""}
                  </p>
                  <div className="search-result-meta">
                    <FiClock />
                    <span>{readingTime} min read</span>
                  </div>
                </div>

                <Link
                  to={`/post/${post.id}`}
                  className="search-result-open"
                  aria-label={`Read ${post.title}`}
                >
                  <FiArrowUpRight />
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default SearchPage;