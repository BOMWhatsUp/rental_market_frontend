import React, { useState } from "react";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../api/rentalProduct/rentalProductAPI";
import { useMutation, useQuery } from "react-query";
import Badge from "../components/Badge";
import sample404 from "../assets/404sample.png";
import profileSample from "../assets/profile_sample.png";
import { maxRentalPeriod, categoryName } from "../utils/converter";
import { RentalProductDetail } from "../types/product";
import moment from "moment";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { userInfo } from "../atoms/userInfo";
import { useRecoilValue } from "recoil";
import { token } from "../atoms/token";
import axios from "axios";

export default function RentalDetailPage() {
  const productId = useParams().id;
  //token
  const accessToken = useRecoilValue(token); //FIXME: hook 에러 나서
  //Login User 정보
  const userId = useRecoilValue(userInfo).userEmail;
  const userNickName = useRecoilValue(userInfo).userNickName;
  const navigate = useNavigate();
  //TODO: chat 확인 필요
  const [rentalRequest, setRentalRequest] = useState(false);

  const { isLoading, isError, data, error }: any = useQuery(
    "productDetail",
    () => getProduct(productId, accessToken),
    {
      //TODO: accessToken 기능 머지 되면, userId, 등등 null check 해야함
      //enabled: !!productId && !!userId,
      enabled: !!productId,
      onError: (error: any) => {
        console.error(error);
      },
    }
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

  //TODO: 확인 필요 chat 관련

  const rentalChat = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.name === "rentalRequest") {
      setRentalRequest((prev) => !prev);
      moveChatRoomMutation.mutate();
    } else {
      moveChatRoomMutation.mutate();
    }
  };

  //TODO: 데이터 형식 확인해서 고쳐야 ... 미스테리..sellerId
  const moveChatRoomMutation = useMutation(
    async () => {
      return await axios({
        method: "post",
        url: "https://rentalmarket.monster/chat/room",
        // url: "http://43.200.141.247:8080/chat/room",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        data: {
          // receiverNickname: productDetail.nickname,
          receiverNickname: data.nickname, // 상품 판매자
          senderNickname: userNickName, // 상품 구매자
          product: {
            id: data.id, // 상품ID
            senderId: data.sellerId, // 판매자 email
            nickname: data.nickname, // 판매자 nickName
            content: data.content, // 상품 content
            unitPrice: data.unitPrice, // 상품 unitPrice
            categoryName: data.categoryName, // 상품 categoryName
            mainImageURL: data.imageUrls[0], // 상품 대표 이미지
            maxRentalPeriod: data.maxRentalPeriod, // 상품 maxRentalPeriod
            status: data.status, // 상품 랜탈 상태
            withRegion: data.wishRegion, // 거래 장소
          },
        },
      }).then((res) => res.data);
    },
    {
      onSuccess: (roomId) => {
        // roomId 서버에서 보내줌
        navigate(`/chat/room/${roomId}?senderId=${userNickName}`);
        console.log("문의하기");
      },
      onError: (error) => {
        console.log("통신 에러 발생!", error);
      },
    }
  );

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {productDetail && (
        <div className="container flex justify-center px-5 md:px-40 lg:px-56">
          <div className="flex flex-col">
            <div className="w-full min-w-[33rem] h-96 overflow-hidden rounded relative">
              <div className="carousel w-full">
                {productDetail.imageUrls.map((url, index) => (
                  <div
                    id={`slide${index}`}
                    key={`slide${index}`}
                    className="carousel-item relative w-full h-96"
                  >
                    <img
                      //로컬
                      //src={url}
                      src={`https://dj8fgxzkrerlh.cloudfront.net/${url}`}
                      className="object-cover w-full h-full"
                      onError={onErrorImg}
                    />
                    {productDetail.imageUrls.length > 1 && (
                      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a
                          // href={`#slide${productDetail.imageUrls.length - 1}`}
                          href={`#slide${
                            index === 0
                              ? productDetail.imageUrls.length - 1
                              : index - 1
                          }`}
                          onClick={() =>
                            console.log(productDetail.imageUrls.length - 1)
                          }
                          className="btn btn-circle"
                        >
                          ❮
                        </a>
                        <a
                          href={`#slide${
                            index === productDetail.imageUrls.length - 1
                              ? index - 1
                              : index + 1
                          }`}
                          className="btn btn-circle"
                          onClick={() => console.log(index + 1)}
                        >
                          ❯
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>

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
                  {userId === productDetail.sellerId ? (
                    <button
                      disabled
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      <ChatBubbleBottomCenterTextIcon className="h-3 w-3 mr-0.5" />
                      상품문의
                    </button>
                  ) : (
                    // <button
                    //   className="btn btn-sm btn-outline btn-error py-0"
                    //   onClick={() => handleDelete(productDetail.id)}
                    // >
                    //   상품삭제
                    // </button>
                    <button
                      name="enquiry"
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={rentalChat}
                    >
                      <ChatBubbleBottomCenterTextIcon className="h-3 w-3 mr-0.5" />
                      상품문의
                    </button>
                  )}
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
              </section>
              <section>
                {userId === productDetail.sellerId ||
                productDetail.status === "RENTED" ||
                productDetail.status === "WAITING" ? (
                  <button
                    disabled
                    className="btn btn-primary sm:btn-sm lg:btn-md w-full mt-3"
                  >
                    렌탈하기
                  </button>
                ) : (
                  <Link
                    to={`/product/pay/${productDetail.id}`}
                    className="btn btn-primary sm:btn-sm lg:btn-md w-full mt-3"
                  >
                    렌탈하기
                  </Link>
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
