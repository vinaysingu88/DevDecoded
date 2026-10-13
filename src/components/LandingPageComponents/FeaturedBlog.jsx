
import { Link } from "react-router";
import { FaArrowRight, FaClock, FaStar } from "react-icons/fa";
import "./FeaturedBlog.css";

function FeaturedBlog() {
  return (
    <section className="featured-section" id="featured">
      <div className="container">

        <div className="featured-heading">
          <div>
            <span className="featured-eyebrow">
              <FaStar /> EDITOR'S PICK
            </span>
            <h2>Featured Story</h2>
            <p>
              One story worth your time, selected for curious minds.
            </p>
          </div>

          <Link to="/post/1" className="featured-view-link">
            Explore story <FaArrowRight />
          </Link>
        </div>

        <div className="featured-card">
          <div className="row g-0 align-items-stretch">

            {/* Visual panel */}
            <div className="col-lg-6">
              <div className="featured-image-panel">
                <div className="featured-image-decoration decoration-one"></div>
                <div className="featured-image-decoration decoration-two"></div>

                <div className="featured-code-window">
                  <div className="featured-window-top">
                    <span></span>
                    <span></span>
                    <span></span>
                    <small>build_something.py</small>
                  </div>

                  <div className="featured-code-content">
                    <p><span>01</span> ideas = curiosity</p>
                    <p><span>02</span> skills = practice</p>
                    <p><span>03</span> projects = growth</p>
                    <p className="featured-code-highlight">
                      <span>04</span> start_building()
                    </p>
                  </div>
                </div>

                <div className="featured-image-caption">
                  IDEAS INTO REALITY
                </div>
              </div>
            </div>

            {/* Article details */}
            <div className="col-lg-6">
              <div className="featured-content">
                <span className="featured-category">TECHNOLOGY</span>

                <h3>
                  The Future of Web Development: From Ideas to Impact
                </h3>

                <p className="featured-description">
                  Discover the tools, techniques, and creative thinking
                  behind modern web experiences. A practical starting
                  point for developers who want to keep growing.
                </p>

                <div className="featured-meta">
                  <div className="featured-avatar">D</div>

                  <div className="featured-author">
                    <strong>DevDecoded Editorial</strong>
                    <span>Featured article</span>
                  </div>

                  <div className="featured-read-time">
                    <FaClock />
                    <span>8 min read</span>
                  </div>
                </div>

                <Link to="/post/1" className="featured-read-button">
                  Read Full Story <FaArrowRight />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default FeaturedBlog;
