import { useEffect, useState } from "react";
import SmallCard from "../components/blog-cards/SmallCard";
import Carousel from "../components/carousel/Carousel";

import styles from "./Home.module.css";
import Loading from "../components/Loading";

const Home = () => {
  const [mainPosts, setMainPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [error, setError] = useState(null);

  const calculatePostCount = () => {
    // returns as many posts as fit in two rows.
    const horizontalSpace = window.innerWidth - 48; /* 48 == padding */
    const cardWidth = getCardSizeInPixels(horizontalSpace);
    const postsPerRow = Math.floor(horizontalSpace / cardWidth);

    return postsPerRow * 2;
  };

  function getCardSizeInPixels(horizontalSpace) {
    const rootElement = document.documentElement;
    let cardSize = getComputedStyle(rootElement)
      .getPropertyValue("--home-card-size")
      .trim()
      .match(/\d+/g);

    if (horizontalSpace < 650) {
      cardSize = [90, Infinity];
    }

    const currentSize = Math.min(
      horizontalSpace * (cardSize[0] / 100),
      cardSize[1]
    );

    return currentSize;
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [responseMain, responseSmall] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/posts?limit=3&carousel=true`),
          fetch(
            `${
              import.meta.env.VITE_API_URL
            }/posts?limit=${calculatePostCount()}`
          ),
        ]);

        if (!responseMain.ok) {
          console.error(responseMain.status, responseMain.statusText);
          throw new Error("Failed to fetch main posts");
        }

        if (!responseSmall.ok) {
          console.error(responseSmall.status, responseSmall.statusText);
          throw new Error("Failed to fetch small posts");
        }

        const [dataMain, dataSmall] = await Promise.all([
          responseMain.json(),
          responseSmall.json(),
        ]);

        setMainPosts(dataMain);
        setPosts(dataSmall);
      } catch (err) {
        setError(err.message);
      } finally {
        // Trigger loading screen fade-out after data is fetched
        setTimeout(() => setFadeOut(true), 2500);
        setTimeout(() => setLoading(false), 3000);
      }
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      {loading && <Loading style={{ opacity: fadeOut ? 0 : 1 }} />}
      <Carousel posts={mainPosts} />
      <div className={styles.smallCardContainer}>
        {posts.map((post) => (
          <SmallCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default Home;
