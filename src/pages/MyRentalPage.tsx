import React, { useState } from "react";
import RentalProductItem from "../components/RentalProductItem";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function MyRentalPage() {
  const [filter, setFilter] = useState({
    category: "all",
    region: "all",
    keyword: "",
  });
  const [currentTab, setCurrentTab] = useState("seller");

  const handleChangeTab = (e: React.SyntheticEvent) => {
    if (!(e.target instanceof HTMLAnchorElement)) {
      return;
    }
    setCurrentTab(`${e.target.dataset.title}`);
  };

  const handleChangeCategory = (e: React.SyntheticEvent) => {
    if (!(e.target instanceof HTMLAnchorElement)) {
      return;
    }
    setFilter({
      ...filter,
      [`${e.target.dataset.title}`]: e.target.dataset.value,
    });
  };

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      [`${e.target.name}`]: e.target.value,
    });
  };

  const handleSearch = () => {
    //TODO submit filter

    setFilter({
      ...filter,
      ["keyword"]: "",
    });
  };
  const categoryDisplay = (categoryEn: string) => {
    switch (categoryEn) {
      case "clothing":
        return "의류";
      case "home":
        return "생활가전";
      case "furniture":
        return "가구/인테리어";
      case "digital":
        return "디지털기기";
      case "gameandrecord":
        return "게임/음반";
      case "book":
        return "도서";
      default:
        return "전체";
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between px-5 md:px-28 lg:px-40">
          {/* 지역 */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost m-1">
              전체 지역
            </label>
            <div
              tabIndex={0}
              className="dropdown-content card card-compact w-64 p-2 shadow bg-base-100 text-accent-content"
            >
              <div className="card-body">
                <h3 className="card-title">Card title!</h3>
                <p>you can use any element as a dropdown.</p>
              </div>
            </div>
          </div>

          {/* 검색 */}
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="상품 키워드 검색"
                className="input input-bordered input-primary"
                name="keyword"
                value={filter.keyword}
                onChange={handleChangeKeyword}
              />
              <button
                className="btn btn-square btn-outline btn-primary"
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
          {/* 카테고리 */}
          <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="btn btn-ghost m-1">
              <span className="w-20">{categoryDisplay(filter.category)}</span>
              <Bars3Icon className="h-6 w-6 ml-2" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  className={filter.category === "all" ? "active" : ""}
                  data-title="category"
                  data-value="all"
                  onClick={handleChangeCategory}
                >
                  전체
                </a>
              </li>
              <li>
                <a
                  className={filter.category === "clothing" ? "active" : ""}
                  data-title="category"
                  data-value="clothing"
                  onClick={handleChangeCategory}
                >
                  의류
                </a>
              </li>
              <li>
                <a
                  className={filter.category === "home" ? "active" : ""}
                  data-title="category"
                  data-value="home"
                  onClick={handleChangeCategory}
                >
                  생활가전
                </a>
              </li>
              <li>
                <a
                  className={filter.category === "furniture" ? "active" : ""}
                  data-title="category"
                  data-value="furniture"
                  onClick={handleChangeCategory}
                >
                  가구/인테리어
                </a>
              </li>
              <li>
                <a
                  className={filter.category === "digital" ? "active" : ""}
                  data-title="category"
                  data-value="digital"
                  onClick={handleChangeCategory}
                >
                  디지털기기
                </a>
              </li>
              <li>
                <a
                  className={filter.category === "book" ? "active" : ""}
                  data-title="category"
                  data-value="book"
                  onClick={handleChangeCategory}
                >
                  도서
                </a>
              </li>
              <li>
                <a
                  className={
                    filter.category === "gameandrecord" ? "active" : ""
                  }
                  data-title="category"
                  data-value="gameandrecord"
                  onClick={handleChangeCategory}
                >
                  게임/음반
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-5 md:px-28 lg:px-40 mt-5">
          <div className="tabs tabs-boxed">
            <a
              className={currentTab === "buyer" ? "tab tab-active" : "tab"}
              data-title="buyer"
              onClick={handleChangeTab}
            >
              빌린 상품
            </a>
            <a
              className={currentTab === "seller" ? "tab tab-active" : "tab"}
              data-title="seller"
              onClick={handleChangeTab}
            >
              빌려준 상품
            </a>
          </div>
        </div>

        {currentTab === "seller" ? (
          <div className="px-5 md:px-28 lg:px-40">
            {/* <RentalProductItem isSeller={true} />
            <RentalProductItem isSeller={true} />
            <RentalProductItem isSeller={true} /> */}
          </div>
        ) : (
          <div className="px-5 md:px-28 lg:px-40">
            {/* <RentalProductItem />
            <RentalProductItem />
            <RentalProductItem /> */}
          </div>
        )}
      </div>
    </>
  );
}
