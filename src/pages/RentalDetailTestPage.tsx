import React, { useState } from "react";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userInfo } from "../atoms/userInfo";

const sampleProduct = {
  id: 1,
  title: `샘플상품입니다`,
  content: `샘플상품입니다 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세`,
  unitPrice: 1300,
  maxRentalPeriod: "ONEMONTH",
  categoryName: "FURNITURE",
  wishRegion: "서울 종로구 삼청로 12길 34",
  sellerId: `nick@gmail.com`,
  nickname: `개구리페페`,
  status: "RENTED",
  returnDate: new Date("2023-4-6"),
  imageUrls: [
    "https://dnvefa72aowie.cloudfront.net/origin/article/202301/EC146E3A1E533D4A8BBAB4560932F7167E7D5D28FE0F91B56BAC5F0742125F09.jpg?q=95&s=1440x1440&t=inside",
  ],
  modifiedAt: new Date("2023-3-29"),
  sellerProfile:
    "https://blog.kakaocdn.net/dn/wR5bN/btqSxCsIZD8/0g1pTeaqRwXKvBcxPtqQE0/img.jpg",
  sellerRegion: "서울시 도봉구",
};

export default function RentalDetailTestPage() {
  const { userNickName } = useRecoilValue(userInfo);
  const navigate = useNavigate();
  const [rentalRequest, setRentalRequest] = useState(false);

  // 채팅방 유무에 따라서 생성 or 입장
  // 서버에서 redirect 진행 후 /chat/room/{roomId} 로 이동
  const moveChatRoom = useMutation(
    async () => {
      return await axios({
        method: "post",
        url: "http://43.200.141.247:8080/chat/room",
        data: {
          receiverId: sampleProduct.nickname,
          senderId: userNickName,
          product: sampleProduct,
          // rentalRequest: rentalRequest,
        },
      }).then((res) => res.data);
    },
    {
      onSuccess: (data) => {
        // roomId 보내주신게 혹시 고정값인지??
        navigate(`/chat/room/${data}?senderId=${userNickName}`);
        console.log("문의하기");
      },
      onError: () => {
        console.log("통신 에러 발생!");
      },
    }
  );

  const rental = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.name === "rentalRequest") {
      setRentalRequest((prev) => !prev);
      moveChatRoom.mutate();
    } else {
      moveChatRoom.mutate();
    }
  };

  return (
    <>
      <div className="container flex justify-center px-5 md:px-28 lg:px-40">
        <div className="flex flex-col">
          <div className="w-full h-96 overflow-hidden rounded relative">
            <img
              src={`${sampleProduct.imageUrls}`}
              className="object-cover w-full h-full"
            ></img>
            <div className="badge badge-success border-base-100 gap-2 p-3 md:p-5 absolute md:text-xl right-4 top-4">
              대여가능
            </div>
          </div>
          <div className="flex flex-col">
            <section className="flex justify-between items-center w-full py-3">
              <div className="flex gap-x-3 items-center ">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full">
                    <img src={sampleProduct.sellerProfile} />
                  </div>
                </div>
                <div className="text-sm">
                  <p>{sampleProduct.nickname}</p>
                  <p>서울시 구로구</p>
                </div>
              </div>
              <div>
                <button
                  // to="/chat/room/roomid"
                  name="enquiry"
                  className="btn btn-sm btn-outline btn-primary"
                  onClick={rental}
                >
                  <ChatBubbleBottomCenterTextIcon className="h-3 w-3 mr-0.5" />
                  상품문의
                </button>
              </div>
            </section>
            <div className="divider my-0"></div>
            <section className="mt-3">
              <h1 className="text-xl font-semibold mb-1">진로 두꺼비 인형</h1>
              <p className="text-sm text-neutral mb-1">
                가구/인테리어 ∙<span>2023.03.02 21:34</span>
              </p>
              <p>
                <span className="text-lg font-semibold ">1300원 /일</span>
                <span className="text-sm font-regular ml-3">
                  * 최대 60일 대여가능
                </span>
              </p>
              <p className="mt-5 font-normal">
                소중한 두꺼비 인형을 렌트해 드려요~ <br />
                두꺼비 인형의 효능- 혈액순환, 암예방, 머머머머, 피부정화,
                체질개선, 다이어트 어쨌든 좋습니다.
              </p>
            </section>
            <div className="divider"></div>
            <section>
              <h3 className="text-lg font-semibold">거래 희망지역</h3>
              <p>서울시 구로구</p>
              <div>상세 주소 - 지도?</div>
            </section>
            <section>
              <button
                name="rentalRequest"
                // to="/chat/room/roomid"
                className="btn btn-primary sm:btn-sm lg:btn-md w-full mt-3 "
                onClick={rental}
              >
                렌탈하기
              </button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
