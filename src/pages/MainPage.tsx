import React from "react";
import RentalProductItem from "../components/RentalProductItem";
import { Bars3Icon } from "@heroicons/react/24/outline";
export default function MainPage() {
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
                placeholder="Search…"
                className="input input-bordered"
              />
              <button className="btn btn-square">
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
              <Bars3Icon className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>의류</a>
              </li>
              <li>
                <a>생활가전</a>
              </li>
              <li>
                <a>가구/인테리어</a>
              </li>
              <li>
                <a>디지털기기</a>
              </li>
              <li>
                <a>도서</a>
              </li>
              <li>
                <a>게임/음반</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-5 md:px-28 lg:px-40">
          <RentalProductItem />
          <RentalProductItem />
          <RentalProductItem />
        </div>
      </div>
    </>
  );
}
