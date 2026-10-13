
import React from "react";
import { Link } from "react-router";
import {
  FaCompass,
  FaComments,
  FaPenNib,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import "./WhyDevDecoded.css";

const benefits = [
  {
    icon: <FaCompass />,
    title: "Discover New Ideas",
    description:
      "Explore fresh perspectives, practical insights, and ideas that inspire you to think differently.",
  },
  {
    icon: <FaComments />,
    title: "Think Beyond Headlines",
    description:
      "Go deeper into technology, careers, and the ideas shaping our digital world.",
  },
  {
    icon: <FaPenNib />,
    title: "Share Your Voice",
    description:
      "Turn your knowledge and experiences into stories that others can learn from.",
  },
  {
    icon: <FaUsers />,
    title: "Grow Together",
    description:
      "Be part of a community where curious minds share knowledge and learn from one another.",
  },
];

function WhyDevDecoded() {
  return (
    <section className="why-section" id="about">
      <div className="container">
        <div className="why-heading">
          <span className="why-eyebrow">MORE THAN JUST A BLOG</span>

          <h2>
            Why <span>DevDecoded?</span>
          </h2>

          <p>
            A place for curious minds to explore ideas, share knowledge,
            and turn what they learn into something meaningful.
          </p>
        </div>

        <div className="row g-4">
          {benefits.map((benefit, index) => (
            <div className="col-md-6 col-lg-3" key={benefit.title}>
              <article className="why-card">
                <div className="why-icon">{benefit.icon}</div>

                <span className="why-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            </div>
          ))}
        </div>

        <div className="why-cta">
          <div>
            <span className="why-cta-label">YOUR IDEAS MATTER</span>
            <h3>Have an idea worth sharing?</h3>
            <p>
              Start writing, share your perspective, and become part of
              the conversation.
            </p>
          </div>

          <Link to="/register" className="why-cta-button">
            Start Writing <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WhyDevDecoded;