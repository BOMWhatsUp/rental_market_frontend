import { useState, useEffect } from "react";
import { RentalProduct, RentalProductHistory } from "../types/product";
import { InfiniteData, useInfiniteQuery } from "react-query";
import RentalProductItem from "./RentalProductItem";
import { getProducts } from "../api/rentalProduct/rentalProductAPI";

type ProductListProps = {
  data: InfiniteData<RentalProduct[]>;
  isSuccess: boolean;
  isSeller?: boolean; //로그인 유저가 올린 아이템인지 여부
  //isHistory?: boolean;
};
ProductList.defaultProps = {
  isSeller: false,
  //isHistory: false,
};

export default function ProductList({
  data,
  isSuccess,
  isSeller,
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
              //isHistory={isHistory}
            />
          ))
        )}
    </div>
  );
}
