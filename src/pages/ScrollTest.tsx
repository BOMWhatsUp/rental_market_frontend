import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { RentalProduct } from "../types/product";
import RentalProductItem from "../components/RentalProductItem";

function ScrollTest() {
  const [posts, setPosts] = useState<RentalProduct[]>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const page = useRef<number>(1);
  console.log(page.current);
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
        {posts?.map((post) => (
          <RentalProductItem key={post.id} test={post.id} />
          // <div
          //   key={post.id}
          //   style={{
          //     marginBottom: "1rem",
          //     border: "1px solid #000",
          //     padding: "8px",
          //   }}
          // >
          //   <div>userId: {post.nickname}</div>
          //   <div>id: {post.id}</div>
          //   <div>title: {post.title}</div>
          //   <div>body: {post.content}</div>
          // </div>
        ))}
        {hasNext && (
          <div
            ref={ref}
            className="left-0 absolute bottom-0 bg-pink-500 w-32 h-5"
            style={{ bottom: "-20px" }}
          />
        )}
      </div>
    </>
  );
}

export default ScrollTest;
