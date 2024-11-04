import PropTypes from "prop-types";
import styles from "./MainCard.module.css";

import User from "../user/User";
import { useNavigate } from "react-router-dom";

const MainCard = ({ post, individualPage }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.image} ${styles.big} ${
        post.showCarousel ? "" : styles.headerBackground
      } ${individualPage ? styles.individual : ""} `}
      style={{
        backgroundImage: `url(${post.imageLink})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        <div
          className={styles.text}
          onClick={() => navigate(`/posts/${post.id}`)}
        >
          <h2>{post.title}</h2>
          <p className={styles.summary}>{post.summary}</p>
        </div>

        <div className={styles.info}>
          <User user={post.user} />
          <p className={styles.date}>
            {new Date(post.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

MainCard.propTypes = {
  individualPage: PropTypes.bool,
  post: PropTypes.shape({
    showCarousel: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    summary: PropTypes.string,
    imageLink: PropTypes.string,
    user: PropTypes.object.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainCard;
