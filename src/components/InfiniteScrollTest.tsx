import axios from "axios";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { RentalProduct } from "../types/product";
import RentalProductItem from "../components/RentalProductItem";
import {
  currentPageState,
  hasNextState,
  isInViewState,
  pageItemsState,
} from "../atoms/currentPageAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
type Props = {
  children: React.ReactNode;
};
function InfiniteScrollTest({ children }: Props) {
  //const [posts, setPosts] = useState<RentalProduct[]>([]);
  const [posts, setPosts] = useRecoilState(pageItemsState);
  //const [hasNext, setHasNext] = useState<boolean>(true);
  const [hasNext, setHasNext] = useRecoilState(hasNextState);
  const page = useRef<number>(1);
  const pageNumber = page.current;

  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  const [ref, inView] = useInView({ rootMargin: "0px" });

  const fetch = useCallback(async () => {
    try {
      const res = await axios.get<{
        data: RentalProduct[];
        hasNextPage: boolean;
      }>("/api/products", {
        params: {
          _limit: 6,
          //_page: page.current,
          _page: pageNumber,
        },
      });
      setCurrentPage(() => pageNumber);
      const { data, hasNextPage } = res.data;
      console.log(data, hasNextPage);
      setHasNext(() => hasNextPage);
      setPosts((prevPosts) => [...prevPosts, ...data]); //으으으음..

      //setHasNextPage(data.length > 0);
      setHasNext(hasNextPage);
      if (data.length) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
  }, [inView, hasNext]);

  useEffect(() => {
    if (inView && hasNext) {
      fetch();
    }
  }, [inView, hasNext]);

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>
        Infinite Scrolling Example
      </h1>
      <div className=" bg-purple-300" style={{ position: "relative" }}>
        {/* {posts?.map((post) => (
          <RentalProductItem key={post.id} test={post.id} />

        ))} */}
        {children}
        {hasNext && (
          <div
            ref={ref}
            className="left-0 absolute bottom-0 w-32 h-5"
            style={{ bottom: "-20px" }}
          />
        )}
      </div>
    </>
  );
}

export default InfiniteScrollTest;
