import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MainCard from "../blog-cards/MainCard";
import styles from "./Carousel.module.css";

const Carousel = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [indexStyling, setIndexStyling] = useState("translateX(0)");

  // preload stuff
  useEffect(() => {
    posts.forEach((post) => {
      const img = new Image();
      img.src = post.imageLink;
    });
  }, [posts]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    switch (index) {
      case 0:
        setIndexStyling("translateX(0)");
        break;
      case 1:
        setIndexStyling("translateX(calc(-100vw + var(--page-padding))");
        break;
      case 2:
        setIndexStyling("translateX(calc(-200vw + (var(--page-padding) * 2))");
        break;
      default:
        break;
    }
  };

  if (!posts || posts.length === 0) {
    return (
      <div className={styles.carousel}>
        <MainCard
          post={{
            title: "There are no posts.",
            summary: "This is a disaster!",
            createdAt: "2024-01-01T22:51:20.231Z",
            user: { username: "Donald Trump", picture: "" },
            id: 0,
          }}
        />
      </div>
    );
  }

  return (
    <div className={styles.carousel}>
      <div
        className={styles.cardContainer}
        style={{
          transform: indexStyling,
        }}
      >
        {posts.map((post) => {
          return <MainCard post={post} key={post.id} />;
        })}
      </div>
      <div className={styles.dots}>
        {posts.map((post, index) => (
          <span
            key={post.id}
            className={`${styles.dot} ${
              currentIndex === index ? styles.active : ""
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      imageLink: PropTypes.string,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Carousel;
