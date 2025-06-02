import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PageLogo = ({ styles }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.logo} onClick={() => navigate("/")}>
      <div>
        <div>B</div>
      </div>
      <p>.log</p>
    </div>
  );
};

PageLogo.propTypes = {
  styles: PropTypes.any,
};

export default PageLogo;
