import React, { useState } from "react";
import { Link } from "react-router-dom";

// 최대 랜탈 기간
const maxRentalDay: number = 30;

// 하루 렌탈료
const rentalPay: number = 300;

export default function RentalPayPage() {
  const [rentalday, setRentalDay] = useState(1);
  const totalrentalPay = (rentalday * rentalPay)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const countRentalDay = (type: string) => {
    if (type === "increase") {
      if (rentalday >= maxRentalDay) return;
      setRentalDay((prev) => prev + 1);
    } else {
      setRentalDay((prev) => (prev <= 1 ? prev : prev - 1));
    }
  };

  // 렌탈 일수 INPUT 입력
  const rentaldayOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const onlyNumber = value.replace(/[^0-9]/g, "");

    Number(onlyNumber) <= maxRentalDay
      ? setRentalDay(() => Number(onlyNumber))
      : setRentalDay((prev) => prev);
  };

  const rentaldayOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: number = Number(e.target.value);
    inputValue === 0 ? setRentalDay(1) : setRentalDay(inputValue);
  };

  return (
    <>
      <div className="container flex justify-center px-5 md:px-28 lg:px-40">
        <div className="flex flex-col">
          <div className="w-full h-96 overflow-hidden rounded">
            <img
              src="http://m.ezendolls.com/web/product/big/202103/2252d8e72c6cf7983f5d18e41d3f3213.jpg"
              className="object-cover w-full h-full"
            ></img>
          </div>
          <div className="py-3.5 px-5">
            <span className="text-xs text-sky-500 p-2.5">생활가전</span>
            <div className="flex justify-between">
              <div className="text-2xl font-semibold p-2.5">상품명</div>
              <div className="btn-group items-center">
                <button
                  onClick={() => countRentalDay("increase")}
                  className="btn btn-active btn-ghost"
                >
                  +
                </button>
                <div className="relative mr-3">
                  <input
                    className="outline-0 w-14 text-center"
                    type="text"
                    onChange={rentaldayOnChange}
                    onBlur={rentaldayOnBlur}
                    value={rentalday}
                  />
                  <span className="absolute right-[10%]">일</span>
                </div>
                <button
                  onClick={() => countRentalDay("decrease")}
                  className="btn btn-active btn-ghost"
                >
                  -
                </button>
              </div>
            </div>
            <div className="border-t-[1px] pb-10">
              <div className="flex justify-between text-[13px] p-2.5">
                <span className=" text-gray-400 font-medium">
                  최대 랜탈 기간
                </span>
                <span className="font-bold">3개월(90일)</span>
              </div>
              <div className="flex justify-between text-[13px] p-2.5">
                <span className=" text-gray-400 font-medium">하루 랜탈료</span>
                <span className="font-bold">{rentalPay}원</span>
              </div>
            </div>
            <div className="flex justify-between p-2.5 border-t-[1px] border-black">
              <span className="font-semibold">총 렌탈료</span>
              <span className="text-red-500">
                <span className="text-xl font-medium">{totalrentalPay}</span>
                <span className="text-lg font-bold">원</span>
              </span>
            </div>
            <div className="flex justify-around mt-16">
              <Link to={"/chat/room/:roomId"} className="btn btn-primary w-36">
                문의하기
              </Link>
              <button className="btn btn-primary w-36">거래하기</button>
            </div>
            <div className="mt-11 px-2.5 py-7 text-sm">
              <span className="font-bold">랜탈 안내</span>
              <ul className="list-[inherit] pl-5">
                <li>렌탈 서비스에 대한 설명1</li>
                <li>렌탈 서비스에 대한 설명2</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
