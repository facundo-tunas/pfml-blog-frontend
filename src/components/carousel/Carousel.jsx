import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MainCard from "../blog-cards/MainCard";
import styles from "./Carousel.module.css";

const Carousel = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // preload stuff
  useEffect(() => {
    posts.forEach((post) => {
      const img = new Image();
      img.src = post.imageLink;
    });
  }, [posts]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>; //todo: create template "post" to display
  }

  return (
    <div className={styles.carousel}>
      <div className={styles.cardContainer}>
        {posts.map((post, index) => {
          return (
            <MainCard post={post} bool={index === currentIndex} key={post.id} />
          );
        })}

        <div className={styles.dots}>
          {posts.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                currentIndex === index ? styles.active : ""
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      imageLink: PropTypes.string,
      content: PropTypes.string.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Carousel;
