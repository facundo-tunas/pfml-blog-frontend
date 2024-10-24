import { useEffect, useState } from "react";
import SmallCard from "../components/blog-cards/SmallCard";
import Carousel from "../components/carousel/Carousel";

import styles from "./Home.module.css";
import Loading from "../components/Loading";

const Home = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [mainPosts, setMainPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const [loadingSmall, setLoadingSmall] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [error, setError] = useState(null);

  const calculatePostCount = () => {
    const horizontalSpace = window.innerWidth - 48;
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
            }/posts?limit=${calculatePostCount()}&page=${currentPage}`
          ),
        ]);

        if (!responseMain.ok || !responseSmall.ok) {
          throw new Error("Failed to fetch posts");
        }

        const [dataMain, dataSmall] = await Promise.all([
          responseMain.json(),
          responseSmall.json(),
        ]);

        setMainPosts(dataMain.posts);
        setPosts(dataSmall.posts);
        setTotalPosts(dataMain.totalPosts);
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(() => setFadeOut(true), 2500);
        setTimeout(() => setLoading(false), 3000);

        setTimeout(() => {
          setLoadingSmall(false);
        }, 3000);
      }
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (error) return <div>Error: {error}</div>;

  const totalPages = Math.ceil(totalPosts / calculatePostCount());
  const handlePageChange = (page) => {
    setLoadingSmall(true);
    setFadeOut(false);
    setCurrentPage(page);
  };

  return (
    <main>
      {loading && <Loading style={{ opacity: fadeOut ? 0 : 1 }} />}
      <Carousel posts={mainPosts} />

      <div className={styles.secondSectionContainer}>
        {loadingSmall && (
          <Loading style={{ opacity: fadeOut ? 0 : 1, position: "absolute" }} />
        )}
        <div className={styles.smallCardContainer}>
          {posts.map((post) => (
            <SmallCard key={post.id} post={post} />
          ))}
        </div>
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={index + 1 === currentPage ? styles.activePage : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
