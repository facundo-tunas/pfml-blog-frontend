import { useEffect, useState } from "react";
import MainCard from "../components/blog-cards/MainCard";
import SmallCard from "../components/blog-cards/SmallCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`); // Use your API URL
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const [mainPost, ...smallPosts] = posts;

  return (
    <main>
      <MainCard post={mainPost} />
      <div className="small-cards-container">
        {smallPosts.map((post) => (
          <SmallCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default Home;
