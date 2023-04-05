import React, { useState } from "react";
import { AxiosError } from "axios";
import { getRentalProducts } from "../api/rentalCreate";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useProduct } from "../hooks/useProduct";
import {
  RentalProduct,
  RentalProductForm,
  AddProductForm,
} from "../types/product";
import DaumAddressInput from "../components/DaumAddressButton";
import { useRecoilValue } from "recoil";
import { token } from "../atoms/token";
import { userInfo } from "../atoms/userInfo";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../api/rentalProduct/rentalProductAPI";

export default function RentalCreatePage() {
  const navigte = useNavigate();
  //token
  const accessToken = useRecoilValue(token);
  //Login User 정보
  const userId = useRecoilValue(userInfo).userEmail;
  const userNickName = useRecoilValue(userInfo).userNickName;
  //const { rentalProductFormMutation } = useProduct();

  const rentalProductFormMutation = useMutation({
    mutationFn: (data: AddProductForm) => addProduct(data),
  });

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
  //const queryClient = useQueryClient();

  // const rentalProductMutation = useMutation({
  //   mutationFn: (data: RentalProduct) => addRentalProduct(data),
  //   onSuccess: (res) => {
  //     console.log(res);
  //     queryClient.invalidateQueries("rentalProducts");
  //   },
  // });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.persist();
    const isInputsFilled = Object.values(userInputs).every((input) =>
      Boolean(input)
    );

    if (!isInputsFilled) {
      alert("🚨 모든 입력값을 채워주세요 🚨");
      return;
    }

    const {
      title,
      content,
      unitPrice,
      maxRentalPeriod,
      wishRegion,
      categoryId,
    } = userInputs;

    let newProduct: RentalProductForm = {
      title: title,
      content: content,
      unitPrice: isNaN(parseInt(unitPrice)) ? 0 : parseInt(unitPrice),
      maxRentalPeriod: maxRentalPeriod,
      categoryName: categoryId,
      wishRegion: wishRegion,
      sellerId: userId, //로그인 유저정보
      nickname: userNickName, //로그인 유저정보
    };

    const formData = new FormData();
    let imageLength = showImages?.length > 3 ? 3 : showImages?.length;
    for (let i = 0; i < imageLength; i++) {
      formData.append("imageFiles", showImages[i].file);
    }
    const thumbnailIndex = { thumbnailIndex: currentThumbnailIndex };

    formData.append("mainImageIndex", `${currentThumbnailIndex}`);

    if (newProduct) {
      //formData.append("product", JSON.stringify(newProduct));
      formData.append("title", newProduct.title);
      formData.append("content", newProduct.content);
      formData.append("unitPrice", newProduct.unitPrice.toString());
      formData.append("maxRentalPeriod", newProduct.maxRentalPeriod.toString());
      formData.append("categoryName", newProduct.categoryName);
      formData.append("wishRegion", newProduct.wishRegion);
      formData.append("sellerId", newProduct.sellerId.toString());
      formData.append("nickname", newProduct.nickname);
    }

    for (let value of formData.values()) {
      console.log("formData value", value);
    }
    const addProductForm: AddProductForm = {
      formData: formData,
      accessToken: accessToken,
    };
    if (formData) {
      //rentalProductFormMutation.mutate(formData, {
      rentalProductFormMutation.mutate(addProductForm, {
        onSuccess: (res) => {
          console.log("formdata!", res);
          //router.push(`/post/${feedId}`);
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
          navigte("/main");
        },
        onError: (data) => {
          alert("에러발생! 입력값 확인 및 파일 용량을 확인해주세요.😓");
        },
      });
    }

    //submit 끝나면

    //window.URL.revokeObjectURL(url);
  };

  const [currentThumbnailIndex, setCurrentThunbnailIndex] = useState(0);
  const [showImages, setShowImages]: any[] = useState([]);
  type ImagePreview = {
    index: number;
    title: string;
    localUrl: string;
    file: File;
  };

  let ImagePreviews: ImagePreview[] = [];
  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageLists = e.target.files;
    //let imageUrlLists: any[] = [...showImages];
    let imageLength = imageLists?.length > 3 ? 3 : imageLists?.length;
    for (let i = 0; i < imageLength; i++) {
      const currentImageUrl: any = URL.createObjectURL(imageLists![i]);
      const imagePreview: ImagePreview = {
        index: i,
        title: imageLists![i].name,
        localUrl: currentImageUrl,
        file: imageLists![i],
      };
      ImagePreviews.push(imagePreview);
      console.log(ImagePreviews);
    }
    // if (imageUrlLists.length > 5) {
    //   imageUrlLists = imageUrlLists.slice(0, 5);
    // }

    setShowImages(ImagePreviews);
  };

  const handleDeleteImage = (id: string) => {
    //삭제 가능하나 daisy ui input ui 표시되는것 해결이 안되어서 아직 사용 안함
    setShowImages(showImages.filter((img: any) => img.index !== id));
  };
  const handleSelect = (index: number) => {
    setCurrentThunbnailIndex(index);
  };

  const handleSelectAddress = (address: string) => {
    setUserInputs({ ...userInputs, ["wishRegion"]: address });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.key)) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };
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
              <option value="CLOTHING">의류</option>
              <option value="HOME">생활가전</option>
              <option value="FURNITURE">가구/인테리어</option>
              <option value="DIGITAL">디지털기기</option>
              <option value="BOOK">도서</option>
              <option value="GAMEANDRECORD">게임/음반</option>
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
              onKeyPress={handleKeyDown}
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
              <option value="ONEMONTH">1개월(30일)</option>
              <option value="TWOMONTH">2개월(60일)</option>
              <option value="THREEMONTH">3개월(90일)</option>
            </select>
          </div>
          <div className="flex items-end w-full max-w-sm">
            <div className="w-full">
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
                disabled
              />
            </div>

            <DaumAddressInput
              onSelectAddress={handleSelectAddress}
              isFullAddress={true}
            />
          </div>

          <div className="form-control w-full max-w-sm">
            <label className="label">
              <span className="label-text">상품 이미지</span>
            </label>

            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-sm"
              multiple
              accept="image/jpg,image/png,image/jpeg,image/gif"
              onChange={handleAddImages}
            />
          </div>
          <div className="w-full max-w-sm flex gap-3 border border-primary-content rounded p-2">
            {showImages.map((image: any) => (
              <div
                key={image.index}
                className={
                  image.index === currentThumbnailIndex
                    ? "w-24 h-24 p-2 rounded cursor-pointer border-2 border-red-400"
                    : "w-24 h-24 p-2 rounded cursor-pointer"
                }
              >
                <img
                  src={image.localUrl}
                  alt={`${image.localUrl}-${image.index}`}
                  onClick={() => handleSelect(image.index)}
                />
                {/* <button onClick={() => handleDeleteImage(image.index)}>
                  x
                </button> */}
                <div className="w-20 text-xs overflow-hidden truncate">
                  {image.title}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-info text-start">
            * 이미지 파일은 총합 10MB 이하만 업로드 가능합니다.
          </p>
          <button type="submit" className="btn btn-primary btn-wide mt-5">
            렌탈상품 생성
          </button>
        </div>
      </form>
    </>
  );
}
