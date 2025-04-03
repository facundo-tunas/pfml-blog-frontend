import { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import SmallCard from "../components/blog-cards/SmallCard";
import SmallCardsSkeleton from "../components/blog-cards/SmallCardsSkeleton";
import Carousel from "../components/carousel/Carousel";
import styles from "./Home.module.css";
import Pagination from "../components/pagination/Pagination";
import PopupContext from "../contexts/PopupContext";
import LoadingContext from "../contexts/LoadingContext";
import ModeButton from "../components/modeButton/ModeButton";
import Loading from "../components/Loading";

const fetchSmallPosts = async (page, postCount) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?limit=${postCount}&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts.");
  }

  const data = await response.json();

  return {
    posts: data.posts,
    totalPosts: data.totalPosts,
  };
};

const fetchMainPosts = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?limit=3&carousel=true`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch main posts.");
  }

  const data = await response.json();
  return data.posts;
};

function calculatePostCount() {
  const horizontalSpace = window.innerWidth - 48;
  const cardWidth = getCardSizeInPixels(horizontalSpace);
  const postsPerRow = Math.floor(horizontalSpace / cardWidth);
  return postsPerRow * 2;
}

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

const Home = () => {
  const { showPopup } = useContext(PopupContext);
  const { setFadeOut, setLoading, loading } = useContext(LoadingContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesCache, setTotalPagesCache] = useState(1);

  const postCount = calculatePostCount();

  const { data: mainPosts } = useQuery({
    queryKey: ["mainPosts"],
    queryFn: fetchMainPosts,
    staleTime: 1000 * 60 * 5,
  });

  const { data, isFetching, error, isPreviousData } = useQuery({
    queryKey: ["smallPosts", currentPage, postCount],
    queryFn: () => fetchSmallPosts(currentPage, postCount),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    onError: (error) => {
      showPopup(error.message);
    },
  });

  if (error) {
    showPopup(error.message, false);
    console.error(error);
  }

  const totalPages = Math.ceil(data?.totalPosts / postCount || totalPagesCache);

  useEffect(() => {
    setTotalPagesCache(totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (!isFetching) {
      setTimeout(() => setFadeOut(true), 300);
      setTimeout(() => setLoading(false), 800);
    } else {
      setLoading(true);
      setFadeOut(false);
    }
  }, [isFetching, setFadeOut, setLoading]);

  return (
    <main>
      {loading && currentPage == 1 && (
        <Loading style={{ background: "var(--loading-white)" }} />
      )}
      <Carousel posts={mainPosts || []} />
      <div className={styles.secondSectionContainer}>
        <div className={styles.smallCardContainer}>
          {isFetching && !isPreviousData ? (
            <SmallCardsSkeleton count={postCount} />
          ) : (
            data?.posts.map((post) => <SmallCard key={post.id} post={post} />)
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={setCurrentPage}
        />
      </div>
      <ModeButton />
    </main>
  );
};

export default Home;
