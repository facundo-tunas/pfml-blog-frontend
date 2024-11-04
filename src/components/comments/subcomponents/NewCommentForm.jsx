import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./NewCommentForm.module.css";

const NewCommentForm = ({ onSubmit, onCancel }) => {
  const [newComment, setNewComment] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    onSubmit(newComment);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.commentForm} ${sending ? styles.sending : ""}`}
    >
      <textarea
        autoFocus
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
