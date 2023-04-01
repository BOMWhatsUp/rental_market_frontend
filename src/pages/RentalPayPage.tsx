import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import {
  addTransaction,
  getPayProduct,
} from "../api/rentalProduct/rentalProductAPI";
import { RentalProductDetail } from "../types/product";
import { categoryName, maxRentalPeriod } from "../utils/converter";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Badge from "../components/Badge";
import { useRecoilState } from "recoil";
import { userInfo } from "../atoms/userInfo";
import sample404 from "../assets/404sample.png";
// 최대 랜탈 기간
const maxRentalDay: number = 30;

// 하루 렌탈료
//let rentalPay: number = 300;

export default function RentalPayPage() {
  //TODO: 로그인 없이 임시 테스트를 위한 유저 info - 유저정보로 바꿔야
  const [user, setUser] = useRecoilState(userInfo);

  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      userEmail: "pepe@gmail.com",
      userNickName: "개구리페페",
      userRegion: "서울 도봉구",
      userProfileImage:
        "https://blog.kakaocdn.net/dn/wR5bN/btqSxCsIZD8/0g1pTeaqRwXKvBcxPtqQE0/img.jpg",
    }));
  }, []);

  //TODO: 리팩토링
  const productTransactionMutation = useMutation({
    mutationFn: (form: {
      productId: string;
      userId: string;
      days: number;
      totalPrice: number;
    }) => addTransaction(form),
    onSuccess: (data) => {
      console.log(data, "성공성공");
    },
  });

  const productId = useParams().id;
  const [rentalday, setRentalDay] = useState(1);
  const [rentalPay, setRentalPay] = useState(0);
  const [form, setForm] = useState({
    userId: user.userEmail,
    totalPrice: 0,
    days: 0,
  });
  const { isLoading, isSuccess, isError, data, error }: any = useQuery(
    "productPay",
    () => getPayProduct(productId),
    {
      onSuccess(data) {
        setRentalPay(data.unitPrice);
      },
    }
  );

  const productPay: RentalProductDetail | undefined = data as
    | RentalProductDetail
    | undefined;

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
  const onErrorImg = (e: any) => {
    e.target.src = sample404;
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

  useEffect(() => {
    console.log(totalrentalPay, rentalday);
    const total = rentalday * rentalPay;
    setForm((prevForm) => ({ ...prevForm, userId: user.userEmail }));
    setForm((prevForm) => ({
      ...prevForm,
      totalPrice: total,
    }));
    setForm((prevForm) => ({ ...prevForm, days: rentalday }));
  }, [rentalday]);
  //console.log(form);

  const handleSubmitTransaction = () => {
    const formData = {
      productId: productPay.id,
      userId: user.userEmail,
      days: form.days,
      totalPrice: form.totalPrice,
    };
    productTransactionMutation.mutate(formData);
  };
  return (
    <>
      {data && isSuccess && (
        <div className="container flex justify-center px-5 md:px-28 lg:px-40">
          <div className="flex flex-col">
            <div className="w-full min-w-[33rem] h-96 overflow-hidden rounded relative">
              <div className="carousel w-full">
                {productPay.imageUrls.map((url, index) => (
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
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a
                        // href={`#slide${productDetail.imageUrls.length - 1}`}
                        href={`#slide${
                          index === 0
                            ? productPay.imageUrls.length - 1
                            : index - 1
                        }`}
                        onClick={() =>
                          console.log(productPay.imageUrls.length - 1)
                        }
                        className="btn btn-circle"
                      >
                        ❮
                      </a>
                      <a
                        href={`#slide${
                          index === productPay.imageUrls.length - 1
                            ? index - 1
                            : index + 1
                        }`}
                        className="btn btn-circle"
                        onClick={() => console.log(index + 1)}
                      >
                        ❯
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <Badge value={productPay.status} isFull={true} />
            </div>
            <div className="py-3.5 px-5">
              <span className="text-xs text-sky-500 p-2.5">
                {categoryName(productPay.categoryName)}
              </span>
              <div className="flex justify-between">
                <div className="text-2xl font-semibold p-2.5">
                  {productPay.title}
                </div>
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
                  <span className="font-bold">
                    {maxRentalPeriod(productPay.maxRentalPeriod)} 일
                  </span>
                </div>
                <div className="flex justify-between text-[13px] p-2.5">
                  <span className=" text-gray-400 font-medium">
                    하루 랜탈료
                  </span>
                  <span className="font-bold">{productPay.unitPrice}원</span>
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
                <Link
                  to={"/chat/room/:roomId"}
                  className="btn btn-primary w-36"
                >
                  문의하기
                </Link>
                <button
                  className="btn btn-primary w-36"
                  onClick={handleSubmitTransaction}
                >
                  거래하기
                </button>
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
      )}
    </>
  );
}
