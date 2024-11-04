import PropTypes from "prop-types";
import User from "../../user/User";

import styles from "./LoggedUser.module.css";

const LoggedUser = ({ user, handleLogout }) => (
  <div className={styles.container}>
    <button className={styles.logout} onClick={handleLogout}>
      Logout
    </button>
    <User user={user} />
  </div>
);

LoggedUser.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default LoggedUser;
