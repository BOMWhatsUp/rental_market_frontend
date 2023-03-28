import { useState, useEffect } from "react";
import { RentalProduct } from "../types/product";
import { InfiniteData, useInfiniteQuery } from "react-query";
import RentalProductItem from "./RentalProductItem";
import { getProducts } from "../api/rentalProduct/rentalProductAPI";

type ProductListProps = {
  data: InfiniteData<RentalProduct[]>;
  isSuccess: boolean;
};
const ProductList2 = ({ data, isSuccess }: ProductListProps) => {
  return (
    <div>
      {data === null && <div>데이터 없음 테스트</div>}
      {isSuccess &&
        data &&
        data!.pages.map((page, index) =>
          page.map((pd) => (
            <RentalProductItem test={pd.id} key={pd.id} product={pd} />
          ))
        )}
    </div>
  );
};
export default ProductList2;
