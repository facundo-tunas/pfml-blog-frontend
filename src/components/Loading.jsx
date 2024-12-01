import styles from "./Loading.module.css";
import PropTypes from "prop-types";

const Loading = ({ style }) => {
  return (
    <div className={styles.loading} style={style}>
      <div className={styles.loader}></div>
    </div>
  );
};

Loading.propTypes = {
  style: PropTypes.object,
};

export default Loading;
