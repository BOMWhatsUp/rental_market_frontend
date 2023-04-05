import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  getProductHistory,
  updateBuyerProductHistory,
} from "../api/rentalProduct/rentalProductAPI";
import { token } from "../atoms/token";
import { userInfo } from "../atoms/userInfo";
import RentalProductHistoryItem from "../components/RentalProductHistoryItem";
import { RentalProductHistory } from "../types/product";

export default function RentalReturnPage() {
  const productHistoryId = useParams().id;

  //token
  const accessToken = useRecoilValue(token);

  //Login User 정보
  const userId = useRecoilValue(userInfo).userEmail;
  const { userNickName } = useRecoilValue(userInfo);
  const navigate = useNavigate();

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
      id: string; // historyId
      productId: string;
      message: string;
      userNickname: string;
      sellerNickname: string;
      returnYn: boolean;
      accessToken: string;
    }) => updateBuyerProductHistory(form),
    onSuccess: (response) => {
      //roomId
      console.log(response);

      const roomId = response.data;

      // 받아오는 roomId 채팅방으로 이동
      navigate(`/chat/room/${roomId}?nickname=${userNickName}`);
    },
  });

  const returnProduct = (historyId: string) => {
    const form = {
      id: historyId, // historyId
      productId: data.productId,
      message: trackingInfo,
      userNickname: userNickName,
      sellerNickname: data.sellerNickName,
      returnYn: data.returnYn,
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
