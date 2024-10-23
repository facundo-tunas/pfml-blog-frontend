import PropTypes from "prop-types";
import styles from "./SmallCard.module.css";
import User from "./subcomponents/User";

const SmallCard = ({ post }) => {
  return (
    <div className={styles.card}>
      <img className={styles.cover} src={post.imageLink} alt="" />
      <p className={styles.date}>
        {new Date(post.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>{" "}
      <div>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.summary}>{post.summary}</p>
      </div>
      <User user={post.user} />
    </div>
  );
};

SmallCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default SmallCard;
