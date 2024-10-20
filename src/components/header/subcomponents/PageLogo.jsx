import PropTypes from "prop-types";

const PageLogo = ({ styles }) => {
  return <p className={styles.logo}>😉 Logo</p>;
};

PageLogo.propTypes = {
  styles: PropTypes.any,
};

export default PageLogo;
