import React, { useEffect, useState } from "react";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  //deleteProduct,
  getProduct,
} from "../api/rentalProduct/rentalProductAPI";
import { useMutation, useQuery } from "react-query";
import Badge from "../components/Badge";
import sample404 from "../assets/404sample.png";
import profileSample from "../assets/profile_sample.png";
import { maxRentalPeriod, categoryName } from "../utils/converter";
import { RentalProductDetail } from "../types/product";
import moment from "moment";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { userInfo } from "../atoms/userInfo";
import { token } from "../atoms/token";

// const deleteMutation = (productId: string) => {
//   //useMutation("deleteProduct", () => deleteProduct(productId), {
//   useMutation("deleteProduct", async () => await deleteProduct(productId), {
//     onSuccess: (res) => {
//       console.log("response test", res);
//       // Invalidate and refetch
//       //queryClient.invalidateQueries("todos");
//     },
//   });
// };

// 테스트

const data = {
  categoryName: "HOME",
  content: "새거새거",
  createdAt: "2023-03-31T14:40:27.79989",
  id: 1,
  mainImageUrl: "6f67cf96-56b2-4f58-8",
  maxRentalPeriod: "ONEMONTH",
  modifiedAt: "2023-03-31T14:40:27.799921",
  nickname: "레모나",
  returnDate: new Date("2023-4-6"),
  sellerId: "aa123@gmail.com",
  status: "AVAILABLE",
  title: "냉장고",
  unitPrice: 12300,
  wishRegion: "서울 도봉구 노해로 133",
};

// 테스트

export default function RentalDetailPage() {
  const productId = useParams().id;
  //console.log(id);
  // const { isLoading, isError, data, error }: any = useQuery(
  //   "productDetail",
  //   () => getProduct(productId)
  // );

  //TODO: 로그인 없이 임시 테스트를 위한 유저 info - 유저정보로 바꿔야
  // const [user, setUser] = useRecoilState(userInfo);

  // const productDetail: RentalProductDetail | undefined = data as
  //   | RentalProductDetail
  //   | undefined;
  //console.log(productDetail);
  const onErrorImg = (e: any) => {
    e.target.src = sample404;
  };
  const onErrorProfile = (e: any) => {
    e.target.src = profileSample;
  };

  // const [deleteMutation] = useMutation(deletePost, {
  //   onSuccess: () => {
  //     // 콜백 함수에서 적절한 값을 반환하도록 수정
  //     return true;
  //   },
  // });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };
  useEffect(() => {
    // setUser({
    //   userEmail: "pepe@gmail.com",
    //   userNickName: "개구리페페",
    //   userRegion: "서울시 도봉구",
    //   userProfileImage:
    //     "https://blog.kakaocdn.net/dn/wR5bN/btqSxCsIZD8/0g1pTeaqRwXKvBcxPtqQE0/img.jpg",
    // });
  }, []);

  // react carousel map 관련 문제 해결 테스트
  const testUrls = [
    "https://blog.kakaocdn.net/dn/wR5bN/btqSxCsIZD8/0g1pTeaqRwXKvBcxPtqQE0/img.jpg",
    "https://t1.daumcdn.net/cfile/tistory/992755335A157ED62B",
    "https://img1.daumcdn.net/thumb/C176x176/?fname=https://blog.kakaocdn.net/dn/cv7UPT/btrSm0BDg2h/bigd2G5zkOERd0S1KEq3Ek/img.jpg",
  ];

  //TODO: 지시사항
  // 테스트
  const { userNickName } = useRecoilValue(userInfo);
  console.log(userNickName);
  const navigate = useNavigate();
  const [rentalRequest, setRentalRequest] = useState(false);

  const deleteMutation = useMutation(
    "deleteProduct",
    async (productId: string) => {
      //const res = await deleteProduct(productId);
      //return res;
    },
    {
      onSuccess: (res) => {
        console.log("response test", res);
      },
    }
  );

  //TODO: 지시사항
  const tokenKey = useRecoilValue(token);
  const moveChatRoom = useMutation(
    async () => {
      return await axios({
        method: "post",
        url: "http://43.200.141.247:8080/chat/room",
        headers: { Authorization: tokenKey },
        data: {
          receiverNickname: data.nickname,
          senderNickname: userNickName,
          product: {
            ...data,
            sellerId: {
              email: data.sellerId,
              nickName: data.nickname,
              region: data.wishRegion,
              title: data.title,
              imageUrl: testUrls[0],
            },
          },
          // rentalRequest: rentalRequest,
        },
      }).then((res) => res.data);
    },
    {
      onSuccess: (data) => {
        // roomId 서버에서 보내줌
        navigate(`/chat/room/${data}?senderId=${userNickName}`);
        console.log("문의하기");
      },
      onError: () => {
        console.log("통신 에러 발생!");
      },
    }
  );

  const loginUserInfo = useRecoilValue(userInfo);

  // 채팅방 입장 //TODO: 지시사항
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
      {/* {isLoading && <div>Loading...</div>} */}
      {data && (
        <div className="container flex justify-center px-5 md:px-40 lg:px-56">
          <div className="flex flex-col">
            <div className="w-full min-w-[33rem] h-96 overflow-hidden rounded relative">
              <div className="carousel w-full">
                {/* {productDetail.imageUrls.map((url, index) => (   */}
                {testUrls.map((url, index) => (
                  <div
                    id={`slide${index}`}
                    key={`slide${index}`}
                    className="carousel-item relative w-full h-96"
                  >
                    <img
                      //로컬
                      src={url}
                      //src={`https://dj8fgxzkrerlh.cloudfront.net/${url}`}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                      <a
                        // href={`#slide${productDetail.imageUrls.length - 1}`}
                        href={`#slide${
                          index === 0 ? testUrls.length - 1 : index - 1
                        }`}
                        onClick={() => console.log(testUrls.length - 1)}
                        className="btn btn-circle"
                      >
                        ❮
                      </a>
                      <a
                        href={`#slide${
                          index === testUrls.length - 1 ? index - 1 : index + 1
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

              <Badge value={data.status} isFull={true} />
            </div>
            <div className="flex flex-col">
              <section className="flex justify-between items-center w-full pb-3 pt-4">
                <div className="flex gap-x-3 items-center ">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full">
                      <img
                        src={loginUserInfo.userProfileImage}
                        onError={onErrorProfile}
                      />
                    </div>
                  </div>
                  <div className="text-sm">
                    <p>{data.nickname}</p>
                    <p>{data.wishRegion}</p>
                  </div>
                </div>
                <div>
                  {loginUserInfo.userEmail === data.sellerId ? (
                    <button
                      className="btn btn-sm btn-outline btn-error py-0"
                      // onClick={() => handleDelete(data.id)}
                    >
                      상품삭제
                    </button>
                  ) : (
                    <button
                      // to="/chat/room/roomid"
                      name="enquiry"
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={rental}
                    >
                      <ChatBubbleBottomCenterTextIcon className="h-3 w-3 mr-0.5" />
                      상품문의
                    </button>
                  )}
                </div>
              </section>
              <div className="divider my-0"></div>
              <section className="mt-3">
                <h1 className="text-xl font-semibold mb-1">{data.title}</h1>
                <p className="text-sm text-neutral mb-1">
                  {categoryName(data.categoryName)} ∙
                  <span>{moment(data.modifiedAt).format("YYYY-MM-DD")}</span>
                </p>
                <div className="flex items-center">
                  <span className="text-lg font-semibold ">
                    {data.unitPrice} 원 / 일
                  </span>
                  <span className="text-sm font-regular ml-3">
                    * 최대 {maxRentalPeriod(data.maxRentalPeriod)}일 대여가능
                  </span>
                  {data.returnDate ? (
                    <span className="text-xs text-error ml-3">
                      * 반납까지
                      {moment(data.returnDate).from(Date.now(), true)}
                      남음
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <p className="mt-5 font-normal">{data.content}</p>
              </section>
              <div className="divider"></div>
              <section>
                <h3 className="text-lg font-semibold">거래 희망지역</h3>
                <p>{data.wishRegion}</p>
                <p>여건이 되면 이곳에 지도</p>
              </section>
              <section>
                {loginUserInfo.userEmail === data.sellerId ? (
                  <button
                    disabled
                    className="btn btn-primary sm:btn-sm lg:btn-md w-full mt-3"
                  >
                    렌탈하기
                  </button>
                ) : (
                  <Link
                    to={`/product/pay/${data.id}`}
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
