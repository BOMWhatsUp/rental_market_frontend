import React from "react";
import { Link } from "react-router-dom";
import { RentalProduct, RentalProductHistory } from "../types/product";
import Badge from "./Badge";
import moment from "moment";
import sample404 from "../assets/404sample.png";
type ProductItemProps = {
  isSeller?: boolean; //my rental 에서 구분값
  simpleMode?: boolean; //chat 정보 등 버튼 중복 막기 위함
  //product?: RentalProduct | RentalProductHistory;
  product?: RentalProductHistory; //TODO: null 허용 임시로 했음
};
RentalProductItem.defaultProps = {
  isSeller: false,
  simpleMode: false,
};
export default function RentalProductItem({
  isSeller,
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
  const onErrorImg = (e: any) => {
    e.target.src = sample404;
  };

  return (
    <>
      {product ? (
        <div className="card card-side bg-base-100 shadow-xl my-5 max-h-60">
          <figure className="min-w-[30%] w-[30%] max-w-[30%] relative overflow-hidden">
            <Link to="/product/detail">
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
              <Link to="/product/detail">{product.title}</Link>
            </h2>
            <p className="line-clamp-2 leading-5 min-h-[2.5rem]">
              {product.content}
            </p>
            {/* TODO: 다른 부분 */}
            {product.status === "RENTED" && (
              <p className="text-xs text-error">
                * 반납 까지
                {moment(product.returnDate).from(Date.now(), true)} 남음
              </p>
            )}
            <div className="card-actions justify-between items-center">
              <div className="flex items-center">
                {/* TODO: 다른 부분 */}
                <span>결제금액 {product.totalPrice}원 | </span>
                <span className="ml-2">
                  {moment(product.rentalDate).format("YYYY-MM-DD")}~
                  {moment(product.returnDate).format("YYYY-MM-DD")}
                </span>
              </div>

              {isSeller ? (
                <div>
                  {product.status === "RENTED" ? (
                    <button
                      className="btn btn-outline btn-success sm:btn-xs md:btn-sm mr-2 "
                      onClick={CheckReturn}
                    >
                      반납완료처리
                    </button>
                  ) : (
                    <button
                      disabled
                      className="btn btn-outline btn-success sm:btn-xs md:btn-sm mr-2 "
                    >
                      반납완료처리
                    </button>
                  )}

                  <button
                    className="btn btn-outline btn-error sm:btn-xs md:btn-sm"
                    onClick={CheckDelete}
                  >
                    내역삭제
                  </button>
                </div>
              ) : (
                <div>
                  <Link
                    to={`/product/detail/${product.id}`}
                    className="btn btn-primary btn-outline sm:btn-xs md:btn-sm mr-2"
                  >
                    상세보기
                  </Link>
                  {product.status === "RENTED" && (
                    <Link
                      to={`/product/return/${product.id}`}
                      className="btn btn-primary sm:btn-xs md:btn-sm mr-2"
                    >
                      반납하기
                    </Link>
                  )}

                  {isSeller || product.status === "RENTED" ? (
                    <button
                      disabled
                      className="btn btn-primary sm:btn-xs md:btn-sm"
                    >
                      렌탈하기
                    </button>
                  ) : (
                    //TODO: 다른 부분
                    <Link
                      to="/product/pay/productid"
                      className="btn btn-primary sm:btn-xs md:btn-sm"
                    >
                      다시 렌탈하기
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>product null(test)</div>
      )}
    </>
  );
}
