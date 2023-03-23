import { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import RentalProductItem from "../components/RentalProductItem";
import InfiniteScroll2 from "../components/InfiniteScroll2";
import { RentalProduct } from "../types/product";
import InfiniteScrollTest from "../components/InfiniteScrollTest";
import {
  currentPageState,
  hasNextState,
  isInViewState,
  pageItemsState,
} from "../atoms/currentPageAtom";
import { useRecoilState, useRecoilValue } from "recoil";
//import useInfiniteScroll from "../hooks/useInfiniteScroll";
const RentalProductList = () => {
  //   const { posts } = useInfiniteScroll<RentalProduct>({
  //     limit: 5,
  //     page: 1,
  //     inView: true,
  //   });
  const func = () => {};
  const products = useRecoilValue(pageItemsState);
  console.log(products);
  return (
    <>
      <InfiniteScrollTest>
        <div>
          {products?.map((pd: RentalProduct) => (
            <RentalProductItem key={pd.id} test={pd.id} />
          ))}
        </div>
      </InfiniteScrollTest>
    </>
  );
};
export default RentalProductList;
