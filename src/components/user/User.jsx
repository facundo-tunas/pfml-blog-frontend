import PropTypes from "prop-types";
import styles from "./User.module.css";
import { useEffect, useState } from "react";

const User = ({ user }) => {
  const [userPicture, setUserPicture] = useState("/test-image-user.png");

  useEffect(() => {
    if (user.picture) {
      setUserPicture(user.picture);
    }
  }, [user]);

  return (
    <div className={styles.userContainer}>
      <img className={styles.picture} src={userPicture} alt="" />
      <span className={styles.username}>{user.username}</span>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default User;
