import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Loading from "../components/Loading";
import LoadingContext from "../contexts/LoadingContext";

import styles from "./Post.module.css";
import MainCard from "../components/blog-cards/MainCard";
import CommentsSection from "../components/CommentsSection";

const Post = () => {
  let { id } = useParams();
  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);
  const { fadeOut, loading, setLoading, setFadeOut } =
    useContext(LoadingContext);

  // useEffect(() => {
  //   setLoading(true);
  //   setFadeOut(false);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
        setError(error.message);
      } finally {
        setTimeout(() => setFadeOut(true), 300);
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  let testContent = `
Reading is one of the most enriching activities you can engage in. Whether you prefer fiction, non-fiction, or poetry, the habit of reading offers numerous benefits for your mental well-being and personal development. In this article, we will explore how reading can improve your life in meaningful ways.

## 1. Enhances Cognitive Function

Reading regularly engages your brain, helping improve your memory, focus, and problem-solving skills. Studies have shown that reading can slow down cognitive decline as we age, keeping the brain sharp and active.

> "A reader lives a thousand lives before he dies... The man who never reads lives only one."  
> – George R.R. Martin

## 2. Reduces Stress and Promotes Relaxation

Reading a good book can provide an escape from the daily stresses of life. Getting lost in a fictional world or exploring new ideas helps shift your focus and lowers your stress levels.

### Pro Tip:
Try setting aside 30 minutes before bedtime to read. Studies show that reading a book (instead of looking at screens) promotes better sleep quality.

## 3. Increases Empathy and Emotional Intelligence

When you immerse yourself in stories about different characters and experiences, you gain a deeper understanding of human emotions. This helps build empathy, making you more compassionate and emotionally aware in real life.

- Fiction books offer an inside look into other people’s perspectives.  
- Non-fiction and memoirs help you learn from real-life challenges and triumphs.

## 4. Expands Knowledge and Vocabulary

Reading exposes you to new words, ideas, and concepts. This naturally improves your vocabulary and helps you express yourself better. The more you read, the more knowledge you gain, which can help in both personal conversations and professional environments.

## 5. Strengthens Mental Stamina

Longer books, such as novels or complex non-fiction, require sustained attention. Reading these books trains your brain to focus for longer periods, improving your ability to concentrate on tasks.

---

### Conclusion

The benefits of reading extend beyond entertainment. It sharpens your mind, reduces stress, builds empathy, and enriches your understanding of the world. So, whether it's a paperback, an e-book, or an audiobook, pick up something to read today and experience the positive impact it can have on your life.
.`;
  return (
    <main className={styles.container}>
      {loading ? (
        <Loading
          style={{
            opacity: fadeOut ? 0 : 1,
            position: "absolute",
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

              <ReactMarkdown>{testContent}</ReactMarkdown>
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
