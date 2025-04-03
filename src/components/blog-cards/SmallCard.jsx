import PropTypes from "prop-types";
import styles from "./SmallCard.module.css";
import User from "../user/User";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const SmallCard = ({ post }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleCardClick = () => {
    navigate(`/posts/${post.id}`);
  };

  const queryKey = ["post", String(post.id)]; // <-- Use String(post.id) for consistency

  const prefetchPost = () => {
    queryClient.prefetchQuery({
      queryKey: queryKey,
      queryFn: async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/posts/${post.id}`
        );
        if (!response.ok) {
          throw new Error(`Failed to prefetch post ${post.id}.`);
        }
        return response.json();
      },
      staleTime: 5 * 60 * 1000,
    });
  };
  return (
    <div
      className={styles.card}
      onClick={handleCardClick}
      onMouseEnter={prefetchPost}
    >
      <img className={styles.cover} src={post.imageLink} alt="" />
      <p className={styles.date}>
        {new Date(post.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>{" "}
      <div>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.summary}>{post.summary}</p>
      </div>
      <User user={post.user} />
    </div>
  );
};

SmallCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default SmallCard;
