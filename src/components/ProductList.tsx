import { useState, useEffect } from "react";
import { RentalProduct } from "../types/product";
import { useInfiniteQuery } from "react-query";
import RentalProductItem from "./RentalProductItem";
import { getProducts } from "../api/rentalProduct/rentalProductAPI";

const ProductList: React.FC = () => {
  //infinite scroll 재사용할 부분 (return 전까지)
  const size = 6;
  const categoryName = "CLOTHING";
  const wishRegion = "서울 종로구";
  const keyword = "분홍색";
  const status = "RENTED";
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      "rentalProducts",
      ({ pageParam = 1 }) =>
        getProducts(categoryName, wishRegion, keyword, status, pageParam, size),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length + 1;
          return nextPage;
        },
      }
    );

  console.log(data);
  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="app">
      {data === null && <div>데이터 없음 테스트</div>}
      {isSuccess &&
        data &&
        data!.pages.map((page, index) =>
          page.map((pd) => (
            <RentalProductItem test={pd.id} key={pd.id} product={pd} />
          ))
        )}
    </div>
  );
};
export default ProductList;
