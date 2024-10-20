import PropTypes from "prop-types";

const LoggedUser = ({ username, handleLogout }) => (
  <>
    <button onClick={handleLogout}>logout</button>
    <p>Welcome, {username}</p>
  </>
);

LoggedUser.propTypes = {
  username: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default LoggedUser;
