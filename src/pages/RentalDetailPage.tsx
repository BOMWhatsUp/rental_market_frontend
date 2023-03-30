import React from "react";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../api/rentalProduct/rentalProductAPI";
import { useQuery } from "react-query";
import Badge from "../components/Badge";
import sample404 from "../assets/404sample.png";
import profileSample from "../assets/profile_sample.png";
import { maxRentalPeriod, categoryName } from "../utils/converter";
import { RentalProductDetail } from "../types/product";
import moment from "moment";

export default function RentalDetailPage() {
  const productId = useParams().id;
  //console.log(id);
  const { isLoading, isError, data, error }: any = useQuery(
    "productDetail",
    () => getProduct(productId)
  );

  const productDetail: RentalProductDetail | undefined = data as
    | RentalProductDetail
    | undefined;
  //console.log(productDetail);
  const onErrorImg = (e: any) => {
    e.target.src = sample404;
  };
  const onErrorProfile = (e: any) => {
    e.target.src = profileSample;
  };
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {productDetail && (
        <div className="container flex justify-center px-5 md:px-28 lg:px-40">
          <div className="flex flex-col">
            <div className="w-full min-w-[33rem] h-96 overflow-hidden rounded relative">
              <img
                src={
                  productDetail.imageUrls.length > 0
                    ? `https://dj8fgxzkrerlh.cloudfront.net/${productDetail.imageUrls[0]}`
                    : sample404
                }
                onError={onErrorImg}
                className="object-cover w-full h-full"
              ></img>
              <Badge value={productDetail.status} isFull={true} />
            </div>
            <div className="flex flex-col">
              <section className="flex justify-between items-center w-full pb-3 pt-4">
                <div className="flex gap-x-3 items-center ">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full">
                      <img
                        src={
                          productDetail.sellerProfile
                            ? `https://dj8fgxzkrerlh.cloudfront.net/${productDetail.sellerProfile}`
                            : profileSample
                        }
                        onError={onErrorProfile}
                      />
                    </div>
                  </div>
                  <div className="text-sm">
                    <p>{productDetail.nickname}</p>
                    <p>{productDetail.sellerRegion}</p>
                  </div>
                </div>
                <div>
                  <Link
                    to="/chat/room/roomid"
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    <ChatBubbleBottomCenterTextIcon className="h-3 w-3 mr-0.5" />
                    상품문의
                  </Link>
                </div>
              </section>
              <div className="divider my-0"></div>
              <section className="mt-3">
                <h1 className="text-xl font-semibold mb-1">
                  {productDetail.title}
                </h1>
                <p className="text-sm text-neutral mb-1">
                  {categoryName(productDetail.categoryName)} ∙
                  <span>
                    {moment(productDetail.modifiedAt).format("YYYY-MM-DD")}
                  </span>
                </p>
                <div className="flex items-center">
                  <span className="text-lg font-semibold ">
                    {productDetail.unitPrice} 원 / 일
                  </span>
                  <span className="text-sm font-regular ml-3">
                    * 최대 {maxRentalPeriod(productDetail.maxRentalPeriod)}일
                    대여가능
                  </span>
                  {productDetail.returnDate ? (
                    <span className="text-xs text-error ml-3">
                      * 반납까지
                      {moment(productDetail.returnDate).from(Date.now(), true)}
                      남음
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <p className="mt-5 font-normal">{productDetail.content}</p>
              </section>
              <div className="divider"></div>
              <section>
                <h3 className="text-lg font-semibold">거래 희망지역</h3>
                <p>{productDetail.wishRegion}</p>
                <p>여건이 되면 이곳에 지도</p>
              </section>
              <section>
                <Link
                  to="/chat/room/roomid"
                  className="btn btn-primary sm:btn-sm lg:btn-md w-full mt-3 "
                >
                  렌탈하기
                </Link>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
