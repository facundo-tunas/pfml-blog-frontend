import { useContext } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import LoadingContext from "../contexts/LoadingContext";
import PopupContext from "/src/contexts/PopupContext";
import styles from "./Post.module.css";
import MainCard from "../components/blog-cards/MainCard";
import CommentsSection from "../components/comments/CommentsSection";
import ModeButton from "../components/modeButton/ModeButton";

const Post = () => {
  let { id } = useParams();
  const { showPopup } = useContext(PopupContext);
  const { fadeOut, loading, setLoading, setFadeOut } =
    useContext(LoadingContext);

  const fetchPost = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch post.");
    }
    return response.json();
  };

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: fetchPost,
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
    onError: (error) => {
      showPopup(error.message);
    },
  });

  if (isLoading) {
    setLoading(true);
    setFadeOut(false);
  } else if (!isLoading) {
    setTimeout(() => setFadeOut(true), 300);
    setTimeout(() => setLoading(false), 800);
  }

  if (error) {
    return <div>{error.message}</div>;
  }

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
                  </p>
                </div>
              </div>
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
            <CommentsSection postId={post.id} />
          </div>
        </>
      ) : (
        ""
      )}
      <ModeButton />
    </main>
  );
};

export default Post;
