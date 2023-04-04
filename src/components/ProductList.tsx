import { useState, useEffect } from "react";
import { RentalProduct, RentalProductHistory } from "../types/product";
import { InfiniteData, useInfiniteQuery } from "react-query";
import RentalProductItem from "./RentalProductItem";
import { getProducts } from "../api/rentalProduct/rentalProductAPI";

type ProductListProps = {
  data: InfiniteData<RentalProduct[]>;
  isSuccess: boolean;
  isSeller?: boolean; //로그인 유저가 올린 아이템인지 여부
  userId?: string; //로그인 유저 id =email
  //isHistory?: boolean;
};
ProductList.defaultProps = {
  isSeller: false,
  userId: "",
  //isHistory: false,
};

export default function ProductList({
  data,
  isSuccess,
  isSeller,
  userId,
}: //isHistory,
ProductListProps) {
  return (
    <div>
      {data === null && <div>데이터 없음 테스트</div>}
      {isSuccess &&
        data &&
        data!.pages.map((page, index) =>
          page.map((pd) => (
            <RentalProductItem
              key={pd.id}
              product={pd}
              isSeller={isSeller}
              userId={userId}
              //isHistory={isHistory}
            />
          ))
        )}
    </div>
  );
}
