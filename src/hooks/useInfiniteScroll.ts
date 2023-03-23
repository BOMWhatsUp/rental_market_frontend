import {
  useEffect,
  useRef,
  useState,
  useCallback,
  MutableRefObject,
} from "react";
import axios from "axios";

type UseInfiniteScrollProps = {
  limit: number;
  page: MutableRefObject<number>;
  inView: boolean;
};

type UseInfiniteScrollResponse<T> = {
  posts: T[];
  hasNext: boolean;
  fetchMore: () => void;
};

function useInfiniteScroll<T>({
  limit,
  page,
  inView,
}: UseInfiniteScrollProps): UseInfiniteScrollResponse<T> {
  const [posts, setPosts] = useState<T[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);

  const fetchMore = useCallback(async () => {
    try {
      const res = await axios.get<{
        data: T[];
        hasNextPage: boolean;
      }>("/api/products", {
        params: {
          _limit: limit,
          _page: page.current,
        },
      });
      const { data, hasNextPage } = res.data;
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setHasNext(hasNextPage);
      if (data.length) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, [hasNext, inView]);

  useEffect(() => {
    if (hasNext) {
      fetchMore();
    }
  }, [fetchMore, hasNext]);

  return {
    posts,
    hasNext,
    fetchMore,
  };
}

export default useInfiniteScroll;
