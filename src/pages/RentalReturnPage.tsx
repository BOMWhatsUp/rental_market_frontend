import React from "react";
import RentalProductItem from "../components/RentalProductItem";

export default function RentalReturnPage() {
  return (
    <>
      <h2 className="text-2xl mt-4 mb-8">반납하기</h2>
      <RentalProductItem />
      <div className="text-center my-16">
        <input
          type="text"
          placeholder="상품 운송장 번호를 입렵해주세요."
          className="input input-bordered w-full max-w-xs block mx-auto"
        />
        <button className="btn btn-primary w-40 mt-11">반납하기</button>
      </div>
    </>
  );
}
