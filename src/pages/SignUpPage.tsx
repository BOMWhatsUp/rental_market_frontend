import React from "react";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center">
      <div>
        <h2 className="text-center p-8">
          <div className="text-4xl text-blue-600 font-bold tracking-wide">
            렌탈마켓
          </div>
          <div className="text-4xl text-blue-600 font-bold tracking-wide">
            회원가입
          </div>
        </h2>

        <div className="form-control w-full max-w-xs ">
          <div className="flex">
            <input
              type="text"
              placeholder="email"
              className="mr-3 input input-bordered w-11/12 max-w-xs focus:outline-none focus:border-blue-500 focus:border-2 shrink-0"
            />
            <button className="btn">중복확인</button>
          </div>
          <label className="label">
            <span className="label-text-alt">체크 상태 메시지...</span>
          </label>
        </div>

        <div className="form-control w-full max-w-xs shrink-0 ">
          <div className="flex">
            <input
              type="text"
              placeholder="닉네임"
              className="mr-3 input input-bordered w-11/12 max-w-xs focus:outline-none focus:border-blue-500 focus:border-2 shrink-0"
            />
            <button className="btn">중복확인</button>
          </div>
          <label className="label">
            <span className="label-text-alt">체크 상태 메시지...</span>
          </label>
        </div>

        {/* <div className="form-control w-full max-w-xs ">
          <div className="flex">
            <input
              type="text"
              placeholder="주요 거래 장소를 입력해주세요."
              className="mr-3 input input-bordered w-full max-w-xs focus:outline-none focus:border-blue-500 focus:border-2"
            />
            <button className="btn">중복확인</button>
          </div>
          <label className="label">
            <span className="label-text-alt">체크 상태 메시지...</span>
          </label>
        </div> */}

        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="주요 거래 장소 입력"
              className="input input-bordered w-11/12 focus:outline-none focus:border-blue-500 focus:border-2 focus:border-r-0 "
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

        <div className="form-control w-full max-w-xs ">
          <div className="flex">
            <input
              type="password"
              placeholder="password"
              className="mr-3 input input-bordered w-11/12 max-w-xs focus:outline-none focus:border-blue-500 focus:border-2 shrink-0"
            />
          </div>
          <label className="label">
            <span className="label-text-alt">체크 상태 메시지...</span>
          </label>
        </div>

        <div className="form-control w-full max-w-xs ">
          <div className="flex">
            <input
              type="password"
              placeholder="password"
              className="mr-3 input input-bordered w-11/12 max-w-xs focus:outline-none focus:border-blue-500 focus:border-2 shrink-0"
            />
          </div>
          <label className="label">
            <span className="label-text-alt">체크 상태 메시지...</span>
          </label>
        </div>

        <button className="btn btn-primary">회원가입</button>
      </div>
    </div>
  );
}
