import { useContext, useState, useEffect } from "react";
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

  const [headings, setHeadings] = useState([]);

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

  const generateId = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  useEffect(() => {
    if (post?.content) {
      const headingRegex = /^(#{1,6})\s+(.+)$/gm;
      const extractedHeadings = [];
      let match;

      while ((match = headingRegex.exec(post.content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = generateId(text);

        extractedHeadings.push({
          level,
          text,
          id,
        });
      }

      setHeadings(extractedHeadings);
    }
  }, [post?.content]);

  const HeadingRenderer = ({ level, children, ...props }) => {
    const getTextContent = (node) => {
      if (typeof node === "string") return node;
      if (Array.isArray(node)) return node.map(getTextContent).join("");
      if (node?.props?.children) return getTextContent(node.props.children);
      return "";
    };

    const text = getTextContent(children);
    const id = generateId(text);

    const Tag = `h${level}`;
    return (
      <Tag id={id} {...props}>
        {children}
      </Tag>
    );
  };

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
            {headings.length > 0 && (
              <div className={styles.tableOfContents}>
                <h3>Table of Contents</h3>
                <ul>
                  {headings.map((heading, index) => (
                    <li
                      key={index}
                      style={{
                        marginLeft: `${(heading.level - 1) * 10}px`,
                        listStyle: "none",
                        marginBottom: "8px",
                      }}
                    >
                      <a
                        href={`#${heading.id}`}
                        style={{
                          textDecoration: "none",
                          fontSize:
                            heading.level === 1
                              ? "16px"
                              : heading.level === 2
                              ? "15px"
                              : "14px",
                          fontWeight: heading.level <= 2 ? "600" : "400",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          const element = document.getElementById(heading.id);
                          if (element) {
                            element.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          } else {
                            console.warn(
                              `Element with ID "${heading.id}" not found`
                            );
                          }
                        }}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
                  h1: (props) => <HeadingRenderer level={1} {...props} />,
                  h2: (props) => <HeadingRenderer level={2} {...props} />,
                  h3: (props) => <HeadingRenderer level={3} {...props} />,
                  h4: (props) => <HeadingRenderer level={4} {...props} />,
                  h5: (props) => <HeadingRenderer level={5} {...props} />,
                  h6: (props) => <HeadingRenderer level={6} {...props} />,
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
