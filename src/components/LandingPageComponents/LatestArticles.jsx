
import { Link } from "react-router";
import { FaArrowRight, FaFire } from "react-icons/fa";
import "./LatestArticle.css";

const hashtags = [
  {
    tag: "TechJobs",
    title: "Is Landing a Tech Job Getting Harder?",
    description:
      "Hiring freezes, fierce competition, and changing skills. What's really happening in the tech job market?",
    image: "/images/tech-jobs.png",
  },
  {
    tag: "AIvsHumans",
    title: "Will AI Really Take Over Our Jobs?",
    description:
      "AI is getting smarter every day. Discover which careers could change and what the future might hold.",
    image: "/images/ai-jobs.png",
  },
  {
    tag: "FutureOfTech",
    title: "The Next Big Thing in Technology",
    description:
      "From intelligent robots to breakthrough innovations, explore the ideas shaping tomorrow.",
    image: "/images/future-tech.png",
  },
  {
    tag: "CareerGrowth",
    title: "Skills That Could Change Your Career",
    description:
      "Degrees aren't the whole story. Explore the skills and experiences that could open new doors.",
    image: "/images/career-growth.png",
  },
  {
    tag: "TechReality",
    title: "The Hidden Reality of Working in Tech",
    description:
      "Beyond big salaries and dream offices, what does life in the tech industry actually look like?",
    image: "/images/tech-reality.png",
  },
  {
    tag: "DigitalFuture",
    title: "Are We Ready for a Fully Digital World?",
    description:
      "Smart cities, automation, and connected lives. Is technology moving faster than we can adapt?",
    image: "/images/digital-future.png",
  },
];

function LatestArticles() {
  return (
    <section className="latest-section" id="latest">
      <div className="container">

        <div className="latest-heading">
          <div>
            <span className="latest-eyebrow">
              <FaFire /> WHAT'S TRENDING
            </span>

            <h2>Explore What's Happening</h2>

            <p>
              Big questions, bold ideas, and conversations worth exploring.
            </p>
          </div>

          <Link to="/search" className="latest-view-all">
            Explore Feed <FaArrowRight />
          </Link>
        </div>

        <div className="row g-4">
          {hashtags.map((item) => (
            <div className="col-md-6 col-lg-4" key={item.tag}>
              <Link
                to={`/search?tag=${encodeURIComponent(item.tag)}`}
                className="trend-card"
              >
                <div className="trend-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="trend-image"
                    loading="lazy"
                  />

                  <span className="trend-image-tag">
                    #{item.tag}
                  </span>
                </div>

                <div className="trend-content">
                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <div className="trend-footer">
                    <span>Explore the conversation</span>

                    <span className="trend-arrow">
                      <FaArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default LatestArticles;
