import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./CommentsSection.module.css";
import NewCommentForm from "./subcomponents/NewComment.Form";

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

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

  const handleNewComment = async (content) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ content }),
        }
      );

      if (!response.ok) throw new Error("Failed to add comment.");

      const newCommentData = await response.json();
      console.log(newCommentData);
      setComments([...comments, newCommentData]);
      setShowForm(false);
    } catch (err) {
      setError(err.message);
      setShowForm(false);
    }
  };

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className={styles.commentsContainer}>
      <h2 className={styles.title}>Comments</h2>
      {error ? <p>Error: {error}</p> : ""}
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

      {!showForm && (
        <button
          className={styles.newCommentButton}
          onClick={() => setShowForm(true)}
        >
          Add New Comment
        </button>
      )}

      {showForm && (
        <NewCommentForm
          onSubmit={handleNewComment}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

CommentsSection.propTypes = {
  postId: PropTypes.number,
};

export default CommentsSection;
