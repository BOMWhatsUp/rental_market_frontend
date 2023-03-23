import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { RentalProduct } from "../types/product";
import RentalProductItem from "./RentalProductItem";

type ScrollProps = {
  getScrollItems(items: any): void;
  limit: number;
  children: JSX.Element;
};
function InfiniteScroll({ getScrollItems, limit = 5, children }: ScrollProps) {
  const [posts, setPosts] = useState<RentalProduct[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const page = useRef<number>(1);
  const [ref, inView] = useInView({ rootMargin: "0px" });

  const fetch = useCallback(async () => {
    try {
      const res = await axios.get<{
        data: RentalProduct[];
        hasNextPage: boolean;
      }>("/api/products", {
        params: {
          _limit: 6,
          _page: page.current,
        },
      });
      const { data, hasNextPage } = res.data;
      console.log(data, hasNextPage);
      setPosts((prevPosts) => [...prevPosts, ...data]);
      getScrollItems(posts);
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

export default InfiniteScroll;
