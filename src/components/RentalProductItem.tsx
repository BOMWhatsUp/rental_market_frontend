import React from "react";
import { Link } from "react-router-dom";

type ProductItemProps = {
  isSeller?: boolean;
  test: string;
};
RentalProductItem.defaultProps = {
  isSeller: false,
  test: "",
};
export default function RentalProductItem({
  isSeller,
  test,
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

  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl my-5">
        <figure className="min-w-[30%] w-1/3 relative">
          <Link to="/product/detail">
            <img
              src="http://m.ezendolls.com/web/product/big/202103/2252d8e72c6cf7983f5d18e41d3f3213.jpg"
              alt="Movie"
              className="w-full h-full object-cover"
            />
            <div className="badge badge-success border-base-100 gap-2 p-3 absolute left-2 top-2 ">
              대여가능
            </div>
          </Link>
        </figure>
        <div className="card-body">
          <div className="text-accent text-sm">가구/인테리어</div>

          <h2 className="card-title">
            <Link to="/product/detail">{test}진로 두꺼비 인형</Link>
          </h2>
          <p className="line-clamp-2 leading-5">
            소중한 두꺼비 인형을 렌트해 드려요~ 진로 두꺼비 인형의 효능 효과-
            혈액순환, 암예방, 머머머머, 피부정화, 체질개선, 다이어트, 체중감량,
            근육 증가 등등등등 좋습니다.
          </p>
          <div className="card-actions justify-between items-center">
            <div>1300원 / 일 ∙ 최대 60 일</div>
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
