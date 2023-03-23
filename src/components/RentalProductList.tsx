import { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import RentalProductItem from "../components/RentalProductItem";
import InfiniteScroll from "./InfiniteScroll";
import { RentalProduct } from "../types/product";

const RentalProductList = () => {
  const [products, setProducts] = useState<RentalProduct[]>([]);
  const getScrollItems = (productItems: any) => {
    setProducts([...products, ...productItems]);
  };
  console.log(products);
  return (
    <>
      <InfiniteScroll getScrollItems={getScrollItems} limit={5}>
        <div>
          {products?.map((product) => (
            <RentalProductItem key={product.id} test={product.id} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default RentalProductList;
