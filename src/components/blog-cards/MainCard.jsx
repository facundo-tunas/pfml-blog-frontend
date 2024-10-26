import PropTypes from "prop-types";
import styles from "./MainCard.module.css";

import User from "./subcomponents/User";
import { useNavigate } from "react-router-dom";

const MainCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.image} ${styles.big} `}
      style={{
        backgroundImage: `url(${post.imageLink})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => navigate(`/posts/${post.id}`)}
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
    id: PropTypes.number.isRequired,
    summary: PropTypes.string,
    imageLink: PropTypes.string,
    user: PropTypes.object.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainCard;
