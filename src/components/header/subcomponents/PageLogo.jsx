import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PageLogo = ({ styles }) => {
  const navigate = useNavigate();
  return (
    <p className={styles.logo} onClick={() => navigate("/")}>
      😉 Logo
    </p>
  );
};

PageLogo.propTypes = {
  styles: PropTypes.any,
};

export default PageLogo;
