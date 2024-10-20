import PropTypes from "prop-types";
import styles from "./User.module.css";

const User = ({ user }) => {
  if (!user.picture) {
    user.picture = "../../public/test-image-user.png";
  }

  return (
    <div className={styles.userContainer}>
      <img className={styles.picture} src={user.picture} alt="" />
      <span className={styles.username}>{user.username}</span>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.string.isRequired,
};

export default User;
