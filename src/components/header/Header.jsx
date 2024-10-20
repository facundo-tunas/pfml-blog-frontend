import PropTypes from "prop-types";
import styles from "./Header.module.css";
import AuthButtons from "./subcomponents/AuthButtons";
import LoggedUser from "./subcomponents/LoggedUser";
import PageLogo from "./subcomponents/PageLogo";

const Header = ({ username, handleLogout, isLoggedIn }) => {
  return (
    <header className={styles.header}>
      <PageLogo styles={styles} />
      <div className={styles.auth}>
        {isLoggedIn ? (
          <LoggedUser username={username} handleLogout={handleLogout} />
        ) : (
          <AuthButtons styles={styles} />
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  username: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
