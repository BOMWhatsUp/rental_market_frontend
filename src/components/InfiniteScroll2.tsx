import axios from "axios";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  MutableRefObject,
} from "react";
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

type ScrollProps = {
  //getCurrent(page: MutableRefObject<number>, inView: boolean): void;
  //children: (items: T[]) => JSX.Element;
  children: JSX.Element;
};
function InfiniteScroll2({ children }: ScrollProps) {
  const [posts, setPosts] = useState([]);
  //const [posts, setPosts] = useRecoilState(pageItemsState);
  const setPageItems = useSetRecoilState(pageItemsState);
  const [hasNext, setHasNext] = useRecoilState(hasNextState);
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const page = useRef<number>(1);
  setCurrentPage(page.current);
  //console.log(page.current);
  const [ref, inView] = useInView({ rootMargin: "0px" });
  // const [isInView, setIsInView] = useRecoilState(isInViewState);
  //setIsInView(inView);
  const fetch = useCallback(async () => {
    try {
      const res = await axios.get<{
        //data: T[];
        data: any;
        hasNextPage: boolean;
      }>("/api/products", {
        params: {
          _limit: 6,
          _page: currentPage,
          //_page: page.current,
        },
      });
      const { data, hasNextPage } = res.data;
      console.log(data, hasNextPage);

      const newList = () => [...posts, ...data];
      //setPosts(newList);
      //setPageItems(newList);
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

export default InfiniteScroll2;
