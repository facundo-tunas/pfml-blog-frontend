import { useEffect, useState } from "react";
import SmallCard from "../components/blog-cards/SmallCard";
import Carousel from "../components/carousel/Carousel";

import styles from "./Home.module.css";
import Loading from "../components/Loading";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`); // Use your API URL
        if (!response.ok) {
          console.error(response.status, response.statusText);
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        // Trigger fade-out after data is fetched
        setTimeout(() => setFadeOut(true), 2500);
        setTimeout(() => setLoading(false), 3000);
      }
    };

    fetchPosts();
  }, []);

  if (error) return <div>Error: {error}</div>;

  const sortedPosts = posts.sort((a, b) => {
    if (b.showCarousel !== a.showCarousel) {
      return b.showCarousel - a.showCarousel;
    }
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <main>
      {loading && (
        <Loading
          style={{ opacity: fadeOut ? 0 : 1, transition: "opacity 0.3s" }}
        />
      )}
      <Carousel posts={sortedPosts.slice(0, 3)} />
      <div className={styles.smallCardContainer}>
        {sortedPosts.slice(3).map((post) => (
          <SmallCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default Home;
