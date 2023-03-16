import React, { useState } from "react";
import { AxiosError } from "axios";
import { addRentalProduct, getRentalProducts } from "../api/rentalCreate";
import { useMutation, useQuery, useQueryClient } from "react-query";
export default function RentalCreatePage() {
  //test data, 실제로는 server에서 온 user data atom 이 될것
  const userInfo = {
    userId: "whatsup@naver.com",
    nickname: "봄이와썹",
  };

  //post test용 Get
  const { data, error } = useQuery<RentalProduct[], AxiosError>(
    ["rentalProducts"],
    getRentalProducts
  );

  type RentalProduct = {
    title: string;
    content: string;
    unitPrice: number;
    maxRentalPeriod: string;
    categoryId: string;
    wishRegion: string;
    sellerId: string;
  };

  const [userInputs, setUserInputs] = useState({
    title: "",
    content: "",
    unitPrice: "",
    maxRentalPeriod: "",
    wishRegion: "",
    categoryId: "",
    //imageUrl: "", //???
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };
  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  // Access the client
  const queryClient = useQueryClient();

  const rentalProductMutation = useMutation(addRentalProduct, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("rentalProducts");
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      title,
      content,
      unitPrice,
      maxRentalPeriod,
      wishRegion,
      categoryId,
    } = userInputs;

    let newProduct: RentalProduct = {
      title: title,
      content: content,
      unitPrice: isNaN(parseInt(unitPrice)) ? 0 : parseInt(unitPrice),
      maxRentalPeriod: maxRentalPeriod,
      categoryId: categoryId,
      wishRegion: wishRegion,
      sellerId: userInfo.userId, //로그인 유저정보
    };

    //addRentalProduct(newProduct);
    rentalProductMutation.mutate(newProduct);
    console.log("submit");

    setUserInputs({
      title: "",
      content: "",
      unitPrice: "",
      maxRentalPeriod: "",
      wishRegion: "",
      categoryId: "",
      //imageUrl: "", //???
    });
  };

  //목업데이터 테스트용
  //console.log(data);
  return (
    <>
      <h1 className="text-primary font-extrabold text-center text-3xl mb-5">
        렌탈상품 등록
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <div className="form-control w-full max-w-sm">
            <label className="label">
              <span className="label-text">상품 카테고리</span>
            </label>
            <select
              className="select select-primary w-full max-w-sm"
              name="categoryId"
              value={userInputs.categoryId}
              onChange={handleChangeSelect}
            >
              <option value="" disabled>
                -- 상품 카테고리 선택--
              </option>
              <option value="clothing">의류</option>
              <option value="home">생활가전</option>
              <option value="furniture">가구/인테리어</option>
              <option value="digital">디지털기기</option>
              <option value="book">도서</option>
              <option value="gameandrecord">게임/음반</option>
            </select>
          </div>
          <div className="form-control w-full max-w-sm">
            <label className="label">
              <span className="label-text">상품명</span>
            </label>
            <input
              type="text"
              placeholder="상품명을 입력하세요"
              className="input input-bordered input-primary w-full max-w-sm"
              name="title"
              onChange={handleChange}
              value={userInputs.title}
            />
          </div>
          <div className="form-control w-full max-w-sm">
            <label className="label">
              <span className="label-text">상품 설명</span>
            </label>

            <textarea
              className="textarea textarea-primary w-full max-w-sm"
              placeholder="상품 설명을 입력하세요"
              name="content"
              onChange={handleChangeTextArea}
              value={userInputs.content}
              rows={4}
            ></textarea>
          </div>
          <div className="form-control w-full max-w-sm">
            <label className="label">
              <span className="label-text">하루 렌탈료</span>
            </label>

            <input
              type="text"
              placeholder="하루당 렌탈료를 입력하세요"
              className="input input-bordered input-primary w-full max-w-sm"
              name="unitPrice"
              onChange={handleChange}
              value={userInputs.unitPrice}
            />
          </div>
          <div className="form-control w-full max-w-sm">
            <label className="label">
              <span className="label-text">최대 렌탈 기간</span>
            </label>
            <select
              className="select select-primary w-full max-w-sm"
              name="maxRentalPeriod"
              value={userInputs.maxRentalPeriod}
              onChange={handleChangeSelect}
            >
              <option value="" disabled>
                -- 최대 렌탈 기간 선택--
              </option>
              <option value="1">1개월(30일)</option>
              <option value="2">2개월(60일)</option>
              <option value="3">3개월(90일)</option>
            </select>
          </div>
          <div className="form-control w-full max-w-sm">
            <label className="label">
              <span className="label-text">거래 희망지역</span>
            </label>
            <input
              type="text"
              placeholder="ex. 서울시 종로구"
              className="input input-bordered input-primary w-full max-w-sm"
              name="wishRegion"
              onChange={handleChange}
              value={userInputs.wishRegion}
            />
          </div>
          <div className="form-control w-full max-w-sm">
            <label className="label">
              <span className="label-text">상품 이미지</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-sm"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-wide mt-5">
            렌탈상품 생성
          </button>
        </div>
      </form>
    </>
  );
}
