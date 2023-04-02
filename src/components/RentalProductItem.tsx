import React from "react";
import { Link } from "react-router-dom";
import { RentalProduct, RentalProductHistory } from "../types/product";
import Badge from "./Badge";
import moment from "moment";
import sample404 from "../assets/404sample.png";
import { maxRentalPeriod, categoryName } from "../utils/converter";
type ProductItemProps = {
  isSeller?: boolean; //my rental 에서 구분값
  //product?: RentalProduct | RentalProductHistory;
  product?: RentalProduct; //TODO: null 허용 임시로 했음
  //isHistory?: boolean;
};
RentalProductItem.defaultProps = {
  isSeller: false,
};
export default function RentalProductItem({
  isSeller,
  product,
}: //isHistory,
ProductItemProps) {
  const onErrorImg = (e: any) => {
    e.target.src = sample404;
  };

  return (
    <>
      {product ? (
        <div className="card card-side bg-base-100 shadow-xl my-5 max-h-72">
          <figure className="min-w-[30%] w-[30%] max-w-[30%] relative overflow-hidden">
            <Link to={`/product/detail/${product.id}`}>
              <img
                src={
                  product.mainImageUrl
                    ? `https://dj8fgxzkrerlh.cloudfront.net/${product.mainImageUrl}`
                    : sample404
                }
                onError={onErrorImg}
                alt="Movie"
                className="w-full h-full object-cover"
              />
              <Badge value={product.status} />
            </Link>
          </figure>
          <div className="card-body">
            <div className="text-accent text-sm">
              {categoryName(product.categoryName)}
            </div>

            <h2 className="card-title">
              <Link to={`/product/detail/${product.id}`}>{product.title}</Link>
            </h2>
            <p className="line-clamp-2 leading-5 min-h-[2.5rem]">
              {product.content}
            </p>
            <div className="card-actions justify-between items-center">
              <div className="flex flex-col md:flex-row md:items-center">
                <span>
                  {product.unitPrice}원 / 일 ∙ 최대{" "}
                  {maxRentalPeriod(product.maxRentalPeriod)} 일
                </span>
                {product.returnDate ? (
                  <span className="text-xs text-error md:ml-3">
                    * 반납 까지
                    {moment(product.returnDate).from(Date.now(), true)} 남음
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div>
                <Link
                  to={`/product/detail/${product.id}`}
                  className="btn btn-primary btn-outline btn-xs md:btn-sm mr-2"
                >
                  상세보기
                </Link>
                {isSeller ||
                product.status === "RENTED" ||
                product.status === "WAITING" ? (
                  <button disabled className="btn btn-primary btn-xs md:btn-sm">
                    렌탈하기
                  </button>
                ) : (
                  <Link
                    to="/product/pay/productid"
                    className="btn btn-primary btn-xs md:btn-sm"
                  >
                    렌탈하기
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>product null(test)</div>
      )}
    </>
  );
}
