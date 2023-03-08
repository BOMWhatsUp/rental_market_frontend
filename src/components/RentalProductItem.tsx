import React from "react";

export default function RentalProductItem() {
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl my-5">
        <figure className="w-1/3 relative">
          <img
            src="http://m.ezendolls.com/web/product/big/202103/2252d8e72c6cf7983f5d18e41d3f3213.jpg"
            alt="Movie"
          />
          <div className="badge badge-success border-base-100 gap-2 p-3 absolute left-2 top-2 ">
            대여가능
          </div>
        </figure>
        <div className="card-body">
          <div className="text-accent text-sm">가구/인테리어</div>

          <h2 className="card-title">진로 두꺼비</h2>
          <p>소중한 두꺼비 인형을 렌트해 드려요~</p>
          <div className="card-actions justify-between">
            <div>1300원 / 일 ∙ 최대 60 일</div>
            <button className="btn btn-primary sm:btn-xs md:btn-sm lg:btn-md">
              상세보기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
