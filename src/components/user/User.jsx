import PropTypes from "prop-types";
import styles from "./User.module.css";
import { useEffect } from "react";

const User = ({ user }) => {
  useEffect(() => {
    if (!user.picture) {
      user.picture = "/test-image-user.png";
    }
  }, [user]);

  return (
    <div className={styles.userContainer}>
      <img className={styles.picture} src={user.picture} alt="" />
      <span className={styles.username}>{user.username}</span>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default User;
