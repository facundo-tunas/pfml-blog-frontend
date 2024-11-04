import PropTypes from "prop-types";
import styles from "./Header.module.css";
import AuthButtons from "./subcomponents/AuthButtons";
import LoggedUser from "./subcomponents/LoggedUser";
import PageLogo from "./subcomponents/PageLogo";

const Header = ({ user, handleLogout, isLoggedIn }) => {
  return (
    <header className={styles.header}>
      <PageLogo styles={styles} />
      <div className={styles.auth}>
        {isLoggedIn ? (
          <LoggedUser user={user} handleLogout={handleLogout} />
        ) : (
          <AuthButtons styles={styles} />
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
