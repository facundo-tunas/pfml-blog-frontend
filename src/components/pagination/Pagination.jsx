import PropTypes from "prop-types";
import styles from "./Pagination.module.css";

const Pagination = ({ totalPages, handlePageChange, currentPage }) => {
  return (
    <div className={styles.container}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={index + 1 === currentPage ? styles.activePage : ""}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
