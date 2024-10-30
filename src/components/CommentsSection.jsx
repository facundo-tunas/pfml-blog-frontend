import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./CommentsSection.module.css";

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`
        );

        if (!response.ok) {
          if (response.status == 404) {
            return;
          } else throw new Error("Failed to fetch comments.");
        }

        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleNewComment = () => {};

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.commentsContainer}>
      <h2 className={styles.title}>Comments</h2>
      {comments.length > 0 ? (
        <ul className={styles.commentList}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.comment}>
              <p>
                <strong className={styles.username}>
                  {comment.user.username}
                </strong>
                : {comment.content}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noComments}>No comments available.</p>
      )}
      <button className={styles.newCommentButton} onClick={handleNewComment}>
        Add New Comment
      </button>
    </div>
  );
};

CommentsSection.propTypes = {
  postId: PropTypes.number,
};

export default CommentsSection;
