import PropTypes from "prop-types";
import styles from "./MainCard.module.css";

import User from "./subcomponents/User";

const MainCard = ({ post }) => {
  return (
    <div
      className={`${styles.image} ${styles.big} `}
      style={{
        backgroundImage: `url(${post.imageLink})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div>
        <div className={styles.text}>
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
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    imageLink: PropTypes.string,
    content: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainCard;
