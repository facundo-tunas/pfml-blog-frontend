import PropTypes from "prop-types";
import styles from "./User.module.css";

const User = ({ username }) => {
  return (
    <div className={styles.userContainer}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={styles.userIcon}
      >
        <path d="M12 12c2.67 0 5-2.33 5-5s-2.33-5-5-5-5 2.33-5 5 2.33 5 5 5zm0 2c-5.33 0-8 2.67-8 8v1h16v-1c0-5.33-2.67-8-8-8z" />
      </svg>
      <span className={styles.username}>{username}</span>
    </div>
  );
};

User.propTypes = {
  username: PropTypes.string.isRequired,
};

export default User;
