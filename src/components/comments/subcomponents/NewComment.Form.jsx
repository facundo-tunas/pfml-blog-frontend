import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./NewCommentForm.module.css";

const NewCommentForm = ({ onSubmit, onCancel }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(newComment);
    setNewComment("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <textarea
        className={styles.textArea}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Write your comment here..."
        required
      />
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={styles.cancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

NewCommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default NewCommentForm;
