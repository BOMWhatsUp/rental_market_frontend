import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  addTransaction,
  getPayProduct,
} from "../api/rentalProduct/rentalProductAPI";
import { RentalProductDetail } from "../types/product";
import { categoryName, maxRentalPeriod } from "../utils/converter";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Badge from "../components/Badge";
import { useRecoilValue } from "recoil";
import { userInfo } from "../atoms/userInfo";
import sample404 from "../assets/404sample.png";
import { token } from "../atoms/token";
import axios from "axios";

export default function RentalPayPage() {
  //token
  const accessToken = useRecoilValue(token);
  //Login User 정보
  const userId = useRecoilValue(userInfo).userEmail;
  const userNickName = useRecoilValue(userInfo).userNickName;
  const navigate = useNavigate();
  //TODO: chat 확인 필요
  const [rentalRequest, setRentalRequest] = useState(false);
  // 최대 랜탈 기간
  let maxRentalDay = 0;

  //TODO: 리팩토링
  const productTransactionMutation = useMutation({
    mutationFn: (form: {
      accessToken: string;
      productId: string;
      userId: string;
      userNickName: string;
      days: number;
      totalPrice: number;
    }) => addTransaction(form),
    onSuccess: (response) => {
      console.log(response);
      // roomId 반환
      navigate(`/chat/room/${response.data.roomId}?senderId=${userNickName}`);
    },
  });

  const productId = useParams().id;
  const [rentalday, setRentalDay] = useState(1);
  const [rentalPay, setRentalPay] = useState(0);
  const [form, setForm] = useState({
    userId: userId,
    totalPrice: 0,
    days: 0,
  });
  const { isLoading, isSuccess, isError, data, error }: any = useQuery(
    "productPay",
    () => getPayProduct(productId, accessToken),
    {
      //TODO: accessToken 기능 머지 되면, userId, 등등 null check 해야함
      enabled: !!productId,
      onSuccess(data) {
        maxRentalDay = parseInt(maxRentalPeriod(data.maxRentalPeriod));
        console.log("maxRentalDay", maxRentalDay);
        setRentalPay(() => data.unitPrice);
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
    console.log("count...!", maxRentalDay);
    maxRentalDay = parseInt(maxRentalPeriod(data.maxRentalPeriod));
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
    //TODO: 아무것도 안만졌을때 상태 조정 해야함
    console.log(totalrentalPay, rentalday, rentalPay);
    let total = rentalday * rentalPay;

    setForm((prevForm) => ({ ...prevForm, userId: userId }));
    setForm((prevForm) => ({
      ...prevForm,
      totalPrice: total,
    }));
    setForm((prevForm) => ({ ...prevForm, days: rentalday }));
  }, [rentalday]);
  //console.log(form);

  const handleSubmitTransaction = () => {
    const formData = {
      accessToken: accessToken,
      productId: productPay.id,
      userId: userId,
      userNickName: userNickName,
      days: form.days,
      totalPrice: form.totalPrice,
    };
    productTransactionMutation.mutate(formData);
  };

  const rentalChat = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.name === "rentalRequest") {
      setRentalRequest((prev) => !prev);
      moveChatRoomMutation.mutate();
    } else {
      moveChatRoomMutation.mutate();
    }
  };

  const moveChatRoomMutation = useMutation(
    async () => {
      return await axios({
        method: "post",
        url: "https://rentalmarket.monster/chat/room",
        // url: "http://43.200.141.247:8080/chat/room",
        headers: { Authorization: accessToken },
        data: {
          receiverNickname: productPay.nickname,
          senderNickname: userNickName,
          product: {
            ...productPay,
            sellerId: {
              email: productPay.sellerId, //sellers
              nickName: productPay.nickname, //sellers
              region: productPay.wishRegion, //sellers
              title: productPay.title, // 빼는거고
              //TODO: 아래가 오류나서 안가네요...
              //imageUrl: data.imageURLs[0], //seller 의 profile?? 상품 이미지?
            },
          },
          // rentalRequest: rentalRequest,
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
                    {productPay.imageUrls.length > 1 && (
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
                    )}
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
                <button
                  name="enquiry"
                  className="btn btn-primary w-36"
                  onClick={rentalChat}
                >
                  문의하기
                </button>
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
