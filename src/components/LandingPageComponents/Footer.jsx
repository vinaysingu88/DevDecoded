import React from "react";
import { Link } from "react-router";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              Dev<span>Decoded</span>
              <span className="footer-logo-dot">.</span>
            </Link>

            <p>
              Decode ideas. Discover perspectives. Share knowledge.
              A space for curious minds and meaningful stories.
            </p>

            <div className="footer-socials">
              <a href="https://github.com/" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="https://www.instagram.com/" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://x.com/" aria-label="X">
                <FaXTwitter />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <a href="/#latest">Trending Articles</a>
            <a href="/#about">About Us</a>
          </div>

          <div className="footer-links">
            <h4>For Writers</h4>
            <Link to="/register">Become an Author</Link>
            <Link to="/login">Author Login</Link>
            <Link to="/register">Create an Account</Link>
          </div>

          <div className="footer-links">
            <h4>Discover</h4>
            <Link to="/search?tag=Technology">Technology</Link>
            <Link to="/search?tag=CareerGrowth">Career Growth</Link>
            <Link to="/search?tag=AIvsHumans">Artificial Intelligence</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} DevDecoded. All rights reserved.
          </p>

          <a href="#top" className="footer-back-top">
            Back to top <FaArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
