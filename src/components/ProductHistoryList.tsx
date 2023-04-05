import { useState, useEffect } from "react";
import { RentalProduct, RentalProductHistory } from "../types/product";
import { InfiniteData, useInfiniteQuery } from "react-query";
import RentalProductItem from "./RentalProductItem";
import { getProducts } from "../api/rentalProduct/rentalProductAPI";
import RentalProductHistoryItem from "./RentalProductHistoryItem";

type ProductHistoryListProps = {
  data: InfiniteData<RentalProductHistory[]>;
  isSuccess: boolean;
  isSeller?: boolean; //로그인 유저가 올린 아이템인지 여부
  onDeleteHistory: (historyId: string) => void;
  onUpdateHistory: (historyId: string) => void;
};
ProductHistoryList.defaultProps = {
  isSeller: false,
  simpleMode: false,
};

export default function ProductHistoryList({
  data,
  isSuccess,
  isSeller,
  onDeleteHistory,
  onUpdateHistory,
}: ProductHistoryListProps) {
  console.log(data);
  return (
    <div>
      {data === null && <div>데이터 없음 테스트</div>}

      {isSuccess &&
        data &&
        data!.pages.map((page, index) =>
          page.map((pd) => (
            <RentalProductHistoryItem
              key={pd.id}
              product={pd}
              isSeller={isSeller}
              onDeleteHistory={onDeleteHistory}
              onUpdateHistory={onUpdateHistory}
            />
          ))
        )}
    </div>
  );
}
