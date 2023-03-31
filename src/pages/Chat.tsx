import React, { useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { Link, useParams } from "react-router-dom";
import RentalProductItem from "../components/RentalProductItem";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfo } from "../atoms/userInfo";
import { useQuery } from "react-query";
import axios from "axios";
import { ChatMessage } from "../components/ChatMessage";

interface Message {
  roomId: string;
  sender: string;
  receiver: string;
  userProfile: any;
  message: string;
}

export interface PrevChat {
  id: string;
  userName: string;
  message: string;
  sendTime: string;
  chatRoom: {
    id: string;
  };
}

const Chat: React.FC = () => {
  const roomId = useParams().roomId;
  console.log(roomId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

  const { userNickName } = useRecoilValue(userInfo);

  // 이전 채팅 내역 데이터 가져오기
  const { isLoading, isError, data, error }: any = useQuery(
    ["prevChat", roomId],
    async () => {
      return await axios
        .get(
          `http://43.200.141.247:8080/chat/room?roomId=${roomId}&senderId=${userNickName}`
        )
        .then((res) => res.data);
    }
  );

  console.log(data);

  useEffect(() => {
    let stompClient: Stomp.Client | null = null;
    // 웹소켓 연결을 수립합니다.
    const socket = new SockJS("http://43.200.141.247:8080/chatting");
    // console.log(socket);
    try {
      stompClient = Stomp.over(socket);
      // console.log(stompClient);
      stompClient.connect({}, () => {
        console.log("connected to server");
        setStompClient(stompClient);
      });
    } catch (error) {
      console.error("Error occurred while connecting to WebSocket:", error);
    }

    return () => {
      // 컴포넌트가 언마운트될 때 웹소켓 연결을 끊습니다.
      if (stompClient) {
        stompClient.disconnect(() => {
          console.log("Disconnected from server");
        });
      }
    };
  }, [roomId]);

  useEffect(() => {
    if (stompClient) {
      stompClient.subscribe(`/sub/${roomId}`, (message) => {
        console.log(message);
        const messageData = JSON.parse(message.body) as Message;
        console.log("messageData" + messageData);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            roomId: messageData.roomId,
            sender: messageData.sender,
            receiver: messageData.receiver,
            userProfile: messageData.userProfile,
            message: messageData.message,
          },
        ]);
      });

      console.log(`Subscribed to /sub/${roomId}`);
    }
  }, [roomId, stompClient]);

  const sendMessage = () => {
    if (!stompClient) return;

    stompClient.send(
      "/pub/chat/message",
      {},
      JSON.stringify({
        roomId: roomId,
        sender: loginUserInfo.userNickName,
        receiver: data.receiverName,
        // 채팅룸 DB에서 설정된 receiver 정보를 그대로 사용.
        // /chat/list?userId='유저id';

        // 유저 로그인 s3 파일 주소 적용해서 저장

        userProfile: loginUserInfo.userProfileImage,
        message: message,
      })
    );
    setMessage("");
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  // 채팅 enter 입력 하는 경우
  const handleOnKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // console.log(messages);

  const loginUserInfo = useRecoilValue(userInfo);
  return (
    <div className="divide-y px-5 md:px-28 lg:px-40">
      <RentalProductItem productInfo={data?.product} />
      <div>
        <div className="h-96 py-3.5 overflow-y-scroll scrollbar-hide">
          {/* 실시간 채팅 주고 받기 이전에 채팅내역들 화면에 보여주어야함. */}
          {/* 데이터를 불러오는 중이라면 isLoading 처리 */}
          {data?.messages.map((prvChat: PrevChat) => (
            // 이전 채팅 내역들
            <ChatMessage key={prvChat.id} prevChat={prvChat} />
          ))}

          {/* 이부분은 채팅 메시지를 실시간으로 주고 받는 경우 */}
          {/* 채팅 메시지를 따로 tailwind-styles-components 로 분리 시켜서 작업 필요 할 듯 */}
          {/* {messages.map((message, index) => (
            <div
              className={`chat ${
                loginUserInfo.userNickName === message.sender
                  ? "chat-end"
                  : "chat-start"
              } `}
              key={index}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={loginUserInfo.userProfileImage} // 로그인한 유저 이미지 말고 상대방의 유저 이미지도 필요할 듯..
                    alt="프로필 이미지"
                  />
                </div>
              </div>
              <div className="chat-header font-medium">{message.sender}</div>
              <div
                className={`flex ${
                  loginUserInfo.userNickName === message.sender
                    ? "flex-row-reverse"
                    : ""
                } items-end`}
              >
                <div
                  className={`chat-bubble ${
                    loginUserInfo.userNickName === message.sender
                      ? "bg-green-500"
                      : ""
                  }`}
                >
                  {message.message}
                </div>
                <time className="mx-1.5 chat-footer text-xs opacity-50">
                  12:45
                </time>
              </div>
            </div>
          ))} */}
        </div>
        <label className="relative">
          <input
            type="text"
            placeholder="메시지를 입력해주세요."
            className="input input-bordered w-full max-w-10/12 focus:outline-0"
            value={message}
            onChange={handleMessageChange}
            onKeyPress={handleOnKeyPress}
          />
          <button
            className="absolute top-[-2px] right-[11px]"
            onClick={sendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </label>
      </div>
      <div className="flex justify-end py-5 mt-3.5 border-t border-solid border-black">
        <Link to={"/product/pay"} className="btn btn-primary w-28">
          랜탈하기
        </Link>
      </div>
    </div>
  );
};

export default Chat;
