import React from "react";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function RentalDetailPage() {
  return (
    <>
      <div className="container flex justify-center px-5 md:px-28 lg:px-40">
        <div className="flex flex-col">
          <div className="w-full h-96 overflow-hidden rounded relative">
            <img
              src="http://m.ezendolls.com/web/product/big/202103/2252d8e72c6cf7983f5d18e41d3f3213.jpg"
              className="object-cover w-full h-full"
            ></img>
            <div className="badge badge-success border-base-100 gap-2 p-5 absolute text-xl right-4 top-4">
              대여가능
            </div>
          </div>
          <div className="flex flex-col">
            <section className="flex justify-between items-center w-full py-3">
              <div className="flex gap-x-3 items-center ">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full">
                    <img src="https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG" />
                  </div>
                </div>
                <div className="text-sm">
                  <p>레모나</p>
                  <p>서울시 구로구</p>
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
                두꺼비 인형의 효능- 혈액순환, 암예방, 머머머머... 어쨌든
                좋습니다.
              </p>
            </section>
            <div className="divider"></div>
            <section>
              <h3 className="text-lg font-semibold">거래 희망지역</h3>
              <p>서울시 구로구</p>
              <div>상세 주소 - 지도?</div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
