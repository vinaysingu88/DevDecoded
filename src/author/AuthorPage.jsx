import React from "react";
import CreatePostPrompt from "../components/AuthorPageComponents/CreatePostPrompt";
import FeedSection from "../components/AuthorPageComponents/FeedSection";

function AuthorPage() {
  return (
    <>
      <CreatePostPrompt />
      <FeedSection />
    </>
  );
}

export default AuthorPage;
