import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import LoadingContext from "../contexts/LoadingContext";

const Post = () => {
  let { id } = useParams();
  const [post, setPost] = useState({});

  const [error, setError] = useState(null);
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
      } catch (error) {
        setError(error.message);
      } finally {
        setTimeout(() => setFadeOut(true), 1000);
        setTimeout(() => setLoading(false), 1500);
      }
    };

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      {loading ? (
        <Loading
          style={{
            opacity: fadeOut ? 0 : 1,
            position: "absolute",
            background: "var(--loading-white-transparency)",
          }}
        />
      ) : (
        ""
      )}
      <div>
        <p>{post.title}</p>
      </div>
    </main>
  );
};
export default Post;
