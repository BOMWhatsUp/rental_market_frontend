import { useState, useEffect } from "react";
import { RentalProduct } from "../types/product";
import { useInfiniteQuery } from "react-query";
import { fetchMore } from "../api/fetch";

// type ResponseData<T> = {
//   data: T[];
//   hasNextPage: boolean;
// };

type RentalProducts = {
  items: RentalProduct[];
};

const ProductList: React.FC = () => {
  const LIMIT = 5;
  const fetchRentalProducts = async (page: number) => {
    return fetchMore<RentalProduct[]>(
      `/api/productss?page=${page}&size=${LIMIT}`
    );
  };

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      "rentalProducts",
      ({ pageParam = 1 }) => fetchRentalProducts(pageParam),
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
      {isSuccess &&
        data!.pages.map((page, index) =>
          page.map((pd) => (
            <div className="h-24 bg-purple-400 my-2" key={pd.id}>
              {pd.title}
            </div>
          ))
        )}
    </div>
  );
};
export default ProductList;
