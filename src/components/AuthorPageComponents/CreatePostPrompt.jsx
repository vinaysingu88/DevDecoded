
import React from "react";
import { Link } from "react-router";
import {
  FaPenNib,
  FaArrowRight,
  FaLightbulb,
} from "react-icons/fa";
import "./CreatePostPrompt.css";

function CreatePostPrompt() {
  return (
    <section className="create-post-prompt">
      <div className="create-prompt-icon">
        <FaPenNib />
      </div>

      <div className="create-prompt-content">
        <span className="create-prompt-label">
          YOUR NEXT BIG IDEA
        </span>

        <h2>What's on your mind?</h2>

        <p>
          Share your knowledge, tell your story, and give the
          community something new to think about.
        </p>

        <Link to="/write" className="create-prompt-button">
          Write an Article
          <FaArrowRight />
        </Link>
      </div>

      <div className="create-prompt-decoration" aria-hidden="true">
        <FaLightbulb />
      </div>
    </section>
  );
}

export default CreatePostPrompt;
