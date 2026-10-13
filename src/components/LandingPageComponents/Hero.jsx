
import { Link } from "react-router";
import { FaArrowRight, FaBookOpen, FaCode, FaLightbulb } from "react-icons/fa";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row align-items-center g-5">

          {/* Left content */}
          <div className="col-lg-7">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              A space for curious minds
            </div>

            <h1 className="hero-title">
              Ideas Worth Reading.
              <span> Knowledge Worth Sharing.</span>
            </h1>

            <p className="hero-description">
              Discover fresh perspectives, explore technology, and
              learn something new with every story. Your next great
              idea starts here.
            </p>

            <div className="hero-buttons">
              <a href="#latest" className="btn hero-primary-btn">
                Explore Articles <FaArrowRight />
              </a>

              <Link to="/register" className="btn hero-secondary-btn">
                Start Writing
              </Link>
            </div>

            <div className="hero-note">
              <FaBookOpen />
              <span>Read something new. Share something meaningful.</span>
            </div>
          </div>

          {/* Right visual */}
          <div className="col-lg-5">
            <div className="hero-visual">
              <div className="hero-orb"></div>

              <div className="hero-mini-card hero-card-top">
                <div className="hero-icon-box">
                  <FaCode />
                </div>
                <div>
                  <h6>Technology</h6>
                  <p>Build. Explore. Innovate.</p>
                </div>
              </div>

              <div className="hero-main-card">
                <div className="hero-main-icon">
                  <FaLightbulb />
                </div>

                <span className="hero-card-label">THE POWER OF IDEAS</span>
                <h3>Every great idea begins with curiosity.</h3>
                <p>
                  Explore knowledge that inspires your next big step.
                </p>

                <div className="hero-card-line"></div>
              </div>

              <div className="hero-mini-card hero-card-bottom">
                <div className="hero-icon-box">
                  <FaBookOpen />
                </div>
                <div>
                  <h6>Your next great read</h6>
                  <p>Ideas worth sharing.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
