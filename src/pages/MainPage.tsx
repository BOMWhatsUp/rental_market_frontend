import React, { useState, useEffect } from "react";
import RentalProductItem from "../components/RentalProductItem";
import { Bars3Icon, MapIcon, FlagIcon } from "@heroicons/react/24/outline";
import ProductList from "../components/ProductList";
import { RentalProduct } from "../types/product";
import { InfiniteData, useInfiniteQuery, useQueryClient } from "react-query";
import { getProducts } from "../api/rentalProduct/rentalProductAPI";
import Badge from "../components/Badge";
import { productStatus } from "../utils/converter";
import { userInfo } from "../atoms/userInfo";
import { useRecoilState } from "recoil";

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
  //TODO: 로그인 없이 임시 테스트를 위한 유저 info - 유저정보로 바꿔야
  const [user, setUser] = useRecoilState(userInfo);
  useEffect(() => {
    // setUser({
    //   userEmail: "pepe@gmail.com",
    //   userNickName: "개구리페페",
    //   userRegion: "서울시 도봉구",
    //   userProfileImage:
    //     "https://blog.kakaocdn.net/dn/wR5bN/btqSxCsIZD8/0g1pTeaqRwXKvBcxPtqQE0/img.jpg",
    // });
  }, []);
  //request query param- 바로 적용 안되는 문제 해결
  // let categoryName = "";
  let wishRegion = "";
  // let keyword = "";
  // let status = "";

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

  const regionDisplay = (value: string) => {
    if (value === "user") {
      //TODO: 유저의 정보값 넣어야
      return user.userRegion;
    } else {
      return "전체";
    }
  };
  const handleChangeDropdown = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLAnchorElement;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [`${target.dataset.title}`]: target.dataset.value,
    }));

    // if (target.dataset.title === "region") {
    //   wishRegion = regionDisplay(target.dataset.value);
    // }

    // console.log(target.dataset.title, target.dataset.value);
    // switch (target.dataset.title) {
    //   case "category":
    //     categoryName = target.dataset.value;
    //     break;
    //   case "region":
    //     wishRegion = target.dataset.value;
    //     break;
    //   case "status":
    //     status = target.dataset.value;
    //     break;
    // }
    //console.log(categoryName, "dddd");
    //queryClient.invalidateQueries("rentalProducts");
  };

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [`${target.name}`]: target.value,
    }));
  };

  const handleSearch = () => {
    console.log(filter);
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

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isError,
    isLoading,
  } = useInfiniteQuery(
    ["rentalProducts", filter],

    ({ pageParam = 1 }) =>
      getProducts(
        filter.category,
        filter.region,
        //wishRegion,
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
      onSuccess(data) {
        console.log(filter);
        //console.log("success", data);
        //setPageData((prev) => ({ ...prev, ...data }));
      },

      refetchIntervalInBackground: true,
    }
  );

  //console.log(data);
  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        //console.log("fetching is true");
        if (hasNextPage) await fetchNextPage();
        //setPageData({ ...data });
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  const [test, setTest] = useState(true);
  const [pageData, setPageData] = useState<InfiniteData<RentalProduct[]>>();
  // useEffect(() => {
  //   // setPageData((prev) => ({
  //   //   ...data,
  //   // }));
  //   console.log("filterchanged");
  //   console.log(filter);
  //   console.log(isSuccess, data, isError);
  //   //queryClient.invalidateQueries("rentalProducts");
  //   //refetch();
  //   //queryClient.resetQueries("rentalProducts");

  //   //fetchNextPage({ pageParam: 1 });
  //   //setTest((prev) => !prev);
  // }, [filter]);
  //console.log("test확인", data);
  //console.log(isSuccess, data, isError);
  return (
    <>
      <div className="flex flex-col">
        {/* <div className="flex justify-between px-5 md:px-28 lg:px-40"></div> */}
        <div className="flex items-center justify-between px-5 md:px-16 lg:px-32">
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
                <p>{regionDisplay(filter.region)}</p>
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
                    className={
                      filter.region === user.userRegion ? " active" : ""
                    }
                    data-title="region"
                    data-value={user.userRegion}
                    onClick={handleChangeDropdown}
                  >
                    {user.userRegion}
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
                <li>
                  <a
                    className={
                      filter.status === "RENTED"
                        ? "text-error active"
                        : "text-error"
                    }
                    data-title="status"
                    data-value="RENTED"
                    onClick={handleChangeDropdown}
                  >
                    대여중
                  </a>
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
        <div className="px-5 md:px-16 lg:px-32">
          {isLoading && (
            <div className="h-full flex items-center justify-center">
              <p>Loading...</p>
              <progress className="progress w-56"></progress>
            </div>
          )}
          {isError && (
            <div className="h-full flex items-center justify-center">
              <p>Error...</p>
            </div>
          )}
          <ProductList data={data} isSuccess={isSuccess} />
        </div>
      </div>
    </>
  );
}
