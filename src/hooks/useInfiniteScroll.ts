import { useEffect } from "react";
import { useInfiniteQuery, UseInfiniteQueryResult } from "react-query";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

type InfiniteScrollFetch<T> = (page: number) => Promise<AxiosResponse<T>>;

interface UseInfiniteScrollProps<T> {
  fetch: InfiniteScrollFetch<T>;
  size: number;
}

export function useInfiniteScroll<T>({ fetch }: UseInfiniteScrollProps<T>) {
  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery("data", ({ pageParam = 1 }) => fetch(pageParam), {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
    });
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

  return { data, isSuccess, isFetchingNextPage };
}
