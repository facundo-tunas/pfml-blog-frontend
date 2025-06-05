import PropTypes from "prop-types";
import { useEffect, useState, useRef, useContext } from "react";
import styles from "./CommentsSection.module.css";
import NewCommentForm from "./subcomponents/NewCommentForm";
import PopupContext from "/src/contexts/PopupContext";

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const { showPopup } = useContext(PopupContext);

  const [showForm, setShowForm] = useState(false);
  const commentsEndRef = useRef(null);

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
        console.error(err);
        showPopup(err.message, false);
      }
    };

    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      if (!response.ok) {
        if (response.status == "403") {
          throw new Error("Session has expired.");
        } else {
          throw new Error("Failed to add comment.");
        }
      }

      const newCommentData = await response.json();
      setComments([...comments, newCommentData]);
      setShowForm(false);
      showPopup("Comment added successfully!", true);
    } catch (err) {
      console.error(err);
      setShowForm(false);
      showPopup(err.message, false);
    }
  };

  return (
    <div className={styles.commentsContainer}>
      {comments.length > 0 ? (
        <ul className={styles.commentList}>
          {comments.map((comment) => (
            <li key={comment.id} className={styles.comment}>
              <div className={styles.left}>
                <img
                  className={styles.userImage}
                  src={comment.user.picture || `/test-image-user.png`}
                  alt=""
                />
              </div>
              <div className={styles.right}>
                <div>
                  <p className={styles.username}>{comment.user.username}</p>
                  <p className={styles.date}>
                    {new Date(comment.createdAt).toLocaleDateString(undefined, {
                      hour: "numeric",
                      minute: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.comment}>
          <p className={styles.noComments}>No comments available.</p>
        </div>
      )}
      {!showForm && (
        <button
          className={styles.newCommentButton}
          onClick={() => {
            setShowForm(true);
            setTimeout(() => {
              commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
        >
          Add New Comment
        </button>
      )}
      {showForm && (
        <NewCommentForm
          onSubmit={handleNewComment}
          onCancel={() => setShowForm(false)}
        />
      )}{" "}
      <div ref={commentsEndRef} />
    </div>
  );
};

CommentsSection.propTypes = {
  postId: PropTypes.number,
};

export default CommentsSection;
