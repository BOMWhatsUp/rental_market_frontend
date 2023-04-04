import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  getProductHistory,
  updateBuyerProductHistory,
} from "../api/rentalProduct/rentalProductAPI";
import { token } from "../atoms/token";
import { userInfo } from "../atoms/userInfo";
import RentalProductHistoryItem from "../components/RentalProductHistoryItem";
import RentalProductItem from "../components/RentalProductItem";
import { RentalProductHistory } from "../types/product";

export default function RentalReturnPage() {
  const productHistoryId = useParams().id;
  //token
  const accessToken = useRecoilValue(token);
  //Login User 정보
  const userId = useRecoilValue(userInfo).userEmail;

  const { isLoading, isError, data, error }: any = useQuery(
    "productHistoryDetail",
    () => getProductHistory(productHistoryId, accessToken),
    {
      //TODO: accessToken 기능 머지 되면, userId, 등등 null check 해야함
      //enabled: !!productId && !!userId,
      enabled: !!productHistoryId,
      onError: (error: any) => {
        console.error(error);
      },
      onSuccess: (data) => {
        console.log("success", data);
      },
    }
  );

  const productHistory: RentalProductHistory | undefined = data as
    | RentalProductHistory
    | undefined;
  const [trackingInfo, setTrackingInfo] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingInfo(() => e.target.value);
    console.log(trackingInfo);
  };
  const productHistoryBuyerMutation = useMutation({
    mutationFn: (form: {
      historyId: string;
      trackingInfo: string;
      accessToken: string;
    }) => updateBuyerProductHistory(form),
    onSuccess: (data) => {
      //TODO:아직 백엔드쪽-지기님 구현중...4.4 화 오전
      //
      console.log(data);
      //성공코드, 방이름 , 반납하겠습니다 메세지
      //TODO: 정후님~ 여기에 채팅 기능 연결부탁드려요! -여기는 아직
      // 방있는지 없는지 확인, 있으면 채팅방 입장 없으면 생성,
      //buyer-> seller 메세지 전달

      //<서버에서 오는 것>
      //data.roomid
      //data.message
      //<page 에 있는 것>
      //payProduct =product 정보
      //sellerId,
      //nickname
      //userId=buyer id
    },
  });
  const returnProduct = (historyId: string) => {
    const form = {
      historyId: historyId,
      trackingInfo: trackingInfo,
      accessToken: accessToken,
    };
    productHistoryBuyerMutation.mutate(form);
  };

  return (
    <>
      <div className="container flex justify-center px-12 md:px-40 lg:px-56">
        <div className="flex flex-col w-full">
          <h2 className="text-2xl mt-4 mb-8">반납하기</h2>
          {productHistory && (
            <RentalProductHistoryItem product={productHistory} />
          )}

          <div className="text-center my-16">
            <input
              type="text"
              placeholder="상품 운송장 번호를 입력해주세요."
              className="input input-bordered w-full block mx-auto"
              value={trackingInfo}
              onChange={handleChange}
              onBlur={handleChange}
            />
            <button
              className="btn btn-primary w-40 mt-11"
              onClick={() => returnProduct(productHistory.id)}
            >
              반납하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
