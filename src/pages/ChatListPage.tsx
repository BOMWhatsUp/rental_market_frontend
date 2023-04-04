import axios from "axios";
import { response } from "msw";
import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { token } from "../atoms/token";
import { userInfo } from "../atoms/userInfo";
import { ChatListItem } from "../components/ChatListItem";

// const chatList = [
//   {
//     id: 1,
//     productId: 1,
//     lastChatMsg: "안녕하세요.",
//   },
//   {
//     id: 2,
//     productId: 2,
//     lastChatMsg: "반갑습니다.",
//   },
//   {
//     id: 3,
//     productId: 3,
//     lastChatMsg: "상품 렌탈 문의 드립니다.",
//   },
// ];

export default function ChatListPage() {
  const { userNickName } = useRecoilValue(userInfo);
  //token
  const accessToken = useRecoilValue(token);
  const config = {
    headers: { Authorization: accessToken },
  };

  const { data, isLoading, isError, error, isSuccess } = useQuery(
    ["chatList", userNickName],
    async () => {
      return await axios
        .get(
          `https://rentalmarket.monster/chat/list?nickname=${userNickName}`,
          config
        )
        .then((res) => {
          console.log(res.data);
          return res.data;
        });
    }
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries("chatList");
  }, [data]);

  return (
    <div className="flex flex-col items-center px-5 md:px-28 lg:px-40">
      <h2 className="text-2xl md:text-xl">채팅 목록</h2>
      {/* 채팅방 리스트 -> 컴포넌트로 분류 필요 */}
      {/* 할거 */}
      {/* data를 활용 */}

      <ul className="divide-y">
        {/* {data?.data.map((list: any) => (
          <ChatListItem key={`${list.roomId}`} list={list} />
        ))} */}
        {isSuccess &&
          data.map((list: any) => (
            <ChatListItem key={`${list.roomId}`} list={list} />
          ))}
      </ul>

      {isError && (
        <ul className="divide-y">
          <li>에러가 났음</li>
        </ul>
      )}
    </div>
  );
}
