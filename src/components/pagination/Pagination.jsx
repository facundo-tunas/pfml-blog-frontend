import PropTypes from "prop-types";
import styles from "./Pagination.module.css";
import { useEffect } from "react";
import { useState } from "react";

const Pagination = ({ totalPages, handlePageChange, currentPage }) => {
  const [indexes, setIndexes] = useState([]);
  useEffect(() => {
    const newIndexes = [];

    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) {
        newIndexes.push(i);
      }
    } else {
      const start = Math.max(0, currentPage - 3);
      let end = Math.min(totalPages, currentPage + 1);

      if (currentPage == 1) {
        end = end + 2;
      }

      for (let i = start; i <= end; i++) {
        newIndexes.push(i);
      }
    }

    setIndexes(newIndexes);
  }, [currentPage, totalPages]);

  return (
    <div className={styles.container}>
      <button
        className={`${styles.big} ${currentPage == 1 ? styles.inactive : ""}`}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </button>
      {indexes.map((index) => (
        <button
          key={index}
          className={index + 1 === currentPage ? styles.activePage : ""}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`${styles.big} ${
          currentPage == totalPages ? styles.inactive : ""
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
