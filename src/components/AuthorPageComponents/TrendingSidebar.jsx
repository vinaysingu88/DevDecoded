import React from "react";
import { Link } from "react-router";
import { FiTrendingUp, FiArrowUpRight, FiHash } from "react-icons/fi";
import "./TrendingSidebar.css";

const trendingTopics = [
  { name: "Web Development", posts: "Explore articles" },
  { name: "React", posts: "Explore articles" },
  { name: "Python", posts: "Explore articles" },
  { name: "Django", posts: "Explore articles" },
  { name: "Artificial Intelligence", posts: "Explore articles" },
];

function TrendingSidebar() {
  return (
    <div className="trending-sidebar">
      <section className="trending-card">
        <div className="trending-heading">
          <div className="trending-heading-icon">
            <FiTrendingUp />
          </div>
          <div>
            <h3>Trending Topics</h3>
            <p>Explore what developers are reading</p>
          </div>
        </div>

        <div className="trending-topic-list">
          {trendingTopics.map((topic, index) => (
            <Link
              to={`/search?q=${encodeURIComponent(topic.name)}`}
              className="trending-topic"
              key={topic.name}
            >
              <span className="topic-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="topic-info">
                <strong>
                  <FiHash className="topic-hash" />
                  {topic.name}
                </strong>
                <small>{topic.posts}</small>
              </span>

              <FiArrowUpRight className="topic-arrow" />
            </Link>
          ))}
        </div>

        <Link to="/search" className="trending-view-all">
          Explore all topics <FiArrowUpRight />
        </Link>
      </section>

      <section className="author-tip-card">
        <span className="author-tip-label">CREATOR TIP</span>
        <div className="author-tip-icon">✦</div>
        <h3>Share what you learn.</h3>
        <p>
          Your experience might be exactly what another developer needs to
          solve a problem.
        </p>
        <Link to="/write" className="author-tip-link">
          Write an article <FiArrowUpRight />
        </Link>
      </section>
    </div>
  );
}

export default TrendingSidebar;