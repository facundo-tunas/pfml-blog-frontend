import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Loading from "../components/Loading";
import LoadingContext from "../contexts/LoadingContext";
import PopupContext from "/src/contexts/PopupContext";

import styles from "./Post.module.css";
import MainCard from "../components/blog-cards/MainCard";
import CommentsSection from "../components/comments/CommentsSection";

const Post = () => {
  let { id } = useParams();
  const [post, setPost] = useState(null);

  const { showPopup } = useContext(PopupContext);

  const { fadeOut, loading, setLoading, setFadeOut } =
    useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);
    setFadeOut(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/posts/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch post.");
        }

        const data = await response.json();
        setPost(data);
        console.log(post);
      } catch (error) {
        showPopup(error.message);
      } finally {
        setTimeout(() => setFadeOut(true), 300);
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <main className={styles.container}>
      {loading ? (
        <Loading
          style={{
            opacity: fadeOut ? 0 : 1,

            background: "var(--loading-white)",
          }}
        />
      ) : (
        ""
      )}
      {post ? (
        <>
          <MainCard post={post} individualPage={true} />
          <div className={styles.content}>
            <div className={styles.markdown}>
              <div className={styles.info}>
                <h1 className={styles.title}>{post.title}</h1>
                <div>
                  <p className={styles.author}>{post.user.username}</p>
                  <p className={styles.date}>
                    {new Date(post.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>{" "}
                </div>
              </div>

              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            <CommentsSection postId={post.id} />
          </div>
        </>
      ) : (
        ""
      )}
    </main>
  );
};
export default Post;
