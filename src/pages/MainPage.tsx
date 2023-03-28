import React, { useState, useEffect } from "react";
import RentalProductItem from "../components/RentalProductItem";
import { Bars3Icon, MapIcon, FlagIcon } from "@heroicons/react/24/outline";
import ProductList from "../components/ProductList";
import { RentalProduct } from "../types/product";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { getProducts } from "../api/rentalProduct/rentalProductAPI";
import Badge from "../components/Badge";
import { productStatus } from "../utils/converter";

type ProductsFilter = {
  category: string;
  region: string;
  keyword: string;
  status: string;
};
export default function MainPage() {
  const [filter, setFilter] = useState<ProductsFilter>({
    category: "",
    region: "",
    keyword: "",
    status: "",
  });
  const queryClient = useQueryClient();
  //const queryClient = useQueryClient();
  // const [filter, setFilter] = useState({
  //   category: "",
  //   region: "",
  //   keyword: "",
  //   status: "",
  // });
  // const handleFilterChange = (target: HTMLAnchorElement) => {
  //   setFilter((prevFilter) => ({
  //     ...prevFilter,
  //     [`${target.dataset.title}`]: target.dataset.value,
  //   }));
  // };
  const handleChangeDropdown = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLAnchorElement;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [`${target.dataset.title}`]: target.dataset.value,
    }));
  };

  useEffect(() => {
    console.log(filter);
    queryClient.resetQueries("rentalProducts");
    refetch();
  }, [filter.category]);

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      [`${e.target.name}`]: e.target.value,
    });
    //setDropDown(false);
  };

  const handleSearch = () => {
    //TODO submit filter

    setFilter({
      ...filter,
      ["keyword"]: "",
    });
  };
  const [dropDown, setDropDown] = useState(false);
  const categoryDisplay = (categoryEn: string) => {
    switch (categoryEn) {
      case "CLOTHING":
        return "의류";
      case "HOME":
        return "생활가전";
      case "FURNITURE":
        return "가구/인테리어";
      case "DIGITAL":
        return "디지털기기";
      case "GAMEANDRECORD":
        return "게임/음반";
      case "BOOK":
        return "도서";
      default:
        return "전체";
    }
  };

  const size = 6;
  const categoryName = "CLOTHING";
  const wishRegion = "서울 종로구";
  const keyword = "분홍색";
  const status = "RENTED";

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    "rentalProducts",
    ({ pageParam = 1 }) =>
      //getProducts(categoryName, wishRegion, keyword, status, pageParam, size),
      getProducts(
        filter.category,
        filter.region,
        filter.keyword,
        filter.status,
        pageParam,
        size
      ),
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
    <>
      <div className="flex flex-col">
        {/* <div className="flex justify-between px-5 md:px-28 lg:px-40"></div> */}
        <div className="flex items-center justify-between px-5 md:px-28 lg:px-40">
          <ul className="menu menu-horizontal bg-base-100 z-50 text-sm">
            <li tabIndex={0}>
              <span className="whitespace-nowrap">
                <Bars3Icon className="h-6 w-6" />
                {categoryDisplay(filter.category)}
              </span>
              <ul className={`bg-base-100 rounded-box drop-shadow z-50`}>
                <li>
                  <a
                    className={filter.category === "" ? "active" : ""}
                    data-title="category"
                    data-value=""
                    onClick={handleChangeDropdown}
                  >
                    전체
                  </a>
                </li>
                <li>
                  <a
                    className={filter.category === "CLOTHING" ? "active" : ""}
                    data-title="category"
                    data-value="CLOTHING"
                    onClick={handleChangeDropdown}
                  >
                    의류
                  </a>
                </li>
                <li>
                  <a
                    className={filter.category === "HOME" ? "active" : ""}
                    data-title="category"
                    data-value="HOME"
                    onClick={handleChangeDropdown}
                  >
                    생활가전
                  </a>
                </li>
                <li>
                  <a
                    className={filter.category === "FURNITURE" ? "active" : ""}
                    data-title="category"
                    data-value="FURNITURE"
                    onClick={handleChangeDropdown}
                  >
                    가구/인테리어
                  </a>
                </li>
                <li>
                  <a
                    className={filter.category === "DIGITAL" ? "active" : ""}
                    data-title="category"
                    data-value="DIGITAL"
                    onClick={handleChangeDropdown}
                  >
                    디지털기기
                  </a>
                </li>
                <li>
                  <a
                    className={filter.category === "BOOK" ? "active" : ""}
                    data-title="category"
                    data-value="BOOK"
                    onClick={handleChangeDropdown}
                  >
                    도서
                  </a>
                </li>
                <li>
                  <a
                    className={
                      filter.category === "GAMEANDRECORD" ? "active" : ""
                    }
                    data-title="category"
                    data-value="GAMEANDRECORD"
                    onClick={handleChangeDropdown}
                  >
                    게임/음반
                  </a>
                </li>
              </ul>
            </li>
            <li tabIndex={0}>
              <span>
                <MapIcon className="h-5 w-5 " />
                <p>전체</p>
              </span>

              <ul className={`bg-base-100 rounded-box drop-shadow z-50`}>
                <li className="min-h-fit">
                  <a
                    className={filter.region === "" ? " active" : ""}
                    data-title="region"
                    data-value=""
                    onClick={handleChangeDropdown}
                  >
                    전체
                  </a>
                </li>
                <li>
                  <a
                    className={filter.region === "user" ? " active" : ""}
                    data-title="region"
                    data-value="user"
                    onClick={handleChangeDropdown}
                  >
                    성남시 분당구
                  </a>
                </li>
              </ul>
            </li>

            <li tabIndex={0}>
              <span className="whitespace-nowrap">
                <FlagIcon className="h-5 w-5 " />
                {productStatus(filter.status)}
              </span>
              <ul className={` bg-base-100 rounded-box drop-shadow z-50`}>
                <li className="min-h-fit">
                  <a
                    className={filter.status === "" ? "active" : ""}
                    data-title="status"
                    data-value=""
                    onClick={handleChangeDropdown}
                  >
                    전체
                  </a>
                </li>
                <li>
                  <a
                    className={
                      filter.status === "AVAILABLE"
                        ? "text-success active"
                        : "text-success"
                    }
                    data-title="status"
                    data-value="AVAILABLE"
                    onClick={handleChangeDropdown}
                  >
                    대여가능
                  </a>
                </li>
                <li>
                  <a
                    className={
                      filter.status === "WAITING"
                        ? "text-warning active"
                        : "text-warning"
                    }
                    data-title="status"
                    data-value="WAITING"
                    onClick={handleChangeDropdown}
                  >
                    반납대기
                  </a>
                </li>
                <li
                  className={
                    filter.status === "RENTED"
                      ? "text-error active"
                      : "text-error"
                  }
                  data-title="status"
                  data-value="RENTED"
                  onClick={handleChangeDropdown}
                >
                  <a>대여중</a>
                </li>
              </ul>
            </li>
          </ul>
          <div className="form-control">
            <div className="input-group input-group-sm">
              <input
                type="text"
                placeholder="상품 키워드 검색"
                className="input input-sm input-bordered input-primary"
                name="keyword"
                value={filter.keyword}
                onChange={handleChangeKeyword}
              />
              <button
                className="btn btn-sm btn-square btn-outline btn-primary"
                onClick={handleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="px-5 md:px-28 lg:px-40">
          <ProductList data={data} isSuccess={isSuccess} />
        </div>
      </div>
    </>
  );
}
