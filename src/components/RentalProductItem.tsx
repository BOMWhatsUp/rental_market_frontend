import React from "react";
import { Link } from "react-router-dom";
import { RentalProduct } from "../types/product";
import Badge from "./Badge";
import moment from "moment";

type ProductItemProps = {
  isSeller?: boolean;
  test: string;
  product: RentalProduct;
};
RentalProductItem.defaultProps = {
  isSeller: false,
  test: "",
};
export default function RentalProductItem({
  isSeller,
  test,
  product,
}: ProductItemProps) {
  const CheckDelete = () => {
    if (confirm("렌탈 상품을 정말로 삭제하시겠습니까?")) {
      //submit delete id
      console.log("삭제함");
    }
  };
  const CheckReturn = () => {
    if (
      confirm(
        "반납이 완료되어 렌탈 상품 상태를 '대여가능'으로 변경하시겠습니까?"
      )
    ) {
      //submit put status
      console.log("반납완료 처리함");
    }
  };
  const maxRentalPeriod = (value: string) => {
    switch (value) {
      case "ONEMONTH":
        return "30";
      case "TWOMONTH":
        return "60";
      case "THREEMONTH":
        return "90";
    }
  };
  const categoryName = (value: string) => {
    switch (value) {
      case "CLOTHING":
        return "의류";
      case "HOME":
        return "생활가전";
      case "FURNITURE":
        return "가구/인테리어";
      case "DIGITAL":
        return "디지털기기";
      case "BOOK":
        return "도서";
      case "GAMEANDRECORD":
        return "게임/음반";
    }
  };
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl my-5 max-h-60">
        <figure className="min-w-[30%] w-[30%] max-w-[30%] relative overflow-hidden">
          <Link to="/product/detail">
            <img
              src={
                product.mainImageUrl
                  ? product.mainImageUrl
                  : "http://m.ezendolls.com/web/product/big/202103/2252d8e72c6cf7983f5d18e41d3f3213.jpg"
              }
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
            <Link to="/product/detail">{product.title}</Link>
          </h2>
          <p className="line-clamp-2 leading-5 min-h-[2.5rem]">
            {product.content}
          </p>
          <div className="card-actions justify-between items-center">
            <div className="flex items-center">
              <span>
                {product.unitPrice}원 / 일 ∙ 최대{" "}
                {maxRentalPeriod(product.maxRentalPeriod)} 일
              </span>
              {product.returnDate ? (
                <span className="text-xs text-error ml-3">
                  * 반납 까지
                  {moment(product.returnDate).from(Date.now(), true)} 남음
                </span>
              ) : (
                ""
              )}
            </div>
            {isSeller ? (
              <div>
                <button
                  className="btn btn-outline btn-success sm:btn-xs md:btn-sm mr-2 "
                  onClick={CheckReturn}
                >
                  반납완료
                </button>
                <button
                  className="btn btn-outline btn-error sm:btn-xs md:btn-sm"
                  onClick={CheckDelete}
                >
                  삭제
                </button>
              </div>
            ) : (
              <div>
                <Link
                  to="/product/detail/productid"
                  className="btn btn-primary btn-outline sm:btn-xs md:btn-sm mr-2"
                >
                  상세보기
                </Link>
                <Link
                  to="/product/pay/productid"
                  className="btn btn-primary sm:btn-xs md:btn-sm"
                >
                  렌탈하기
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
