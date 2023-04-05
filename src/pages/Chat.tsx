import React, { useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { Link, useNavigate, useParams } from "react-router-dom";
import RentalProductItem from "../components/RentalProductItem";
import { useRecoilValue } from "recoil";
import { userInfo } from "../atoms/userInfo";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { ChatMessage } from "../components/ChatMessage";
import { token } from "../atoms/token";
import { RentalProduct } from "../types/product";

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
  const navigate = useNavigate();
  // console.log(roomId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

  const { userNickName } = useRecoilValue(userInfo);

  const queryClient = useQueryClient();
  //token
  const accessToken = useRecoilValue(token); //TODO: hook 에러 나서
  //Login User 지역 정보
  const userId = useRecoilValue(userInfo).userEmail;
  const [rentalProduct, setRentalProduct] = useState<RentalProduct>();

  // 이전 채팅 내역 데이터 가져오기
  const config = {
    headers: { Authorization: accessToken },
  };
  const { isLoading, isError, data, error, isSuccess }: any = useQuery(
    ["prevChat", roomId],
    async () => {
      return await axios
        .get(
          `https://rentalmarket.monster/chat/room?roomId=${roomId}&nickname=${userNickName}`,
          // `http://43.200.141.247:8080/chat/room?roomId=${roomId}&nickname=${userNickName}`,
          config
        )
        .then((res) => {
          console.log("이전메세지", res.data.messages);

          const resProduct = res.data.product;
          const productData = {
            id: resProduct.id,
            title: resProduct.title,
            maxRentalPeriod: resProduct.maxRentalPeriod,
            categoryName: resProduct.categoryName,
            sellerId: resProduct.sellerId.email,
            status: resProduct.status,
            content: resProduct.content,
            unitPrice: resProduct.unitPrice,
            mainImageUrl: resProduct.mainImageUrl,
          };

          setRentalProduct(productData);
          console.log(rentalProduct);

          return res.data;
        });

      //이전채팅 내역에서 product sellerid
      // private String senderName;
      // private String receiverName;
      // private ProductBoard product; //product 개체
      // product {
      //   ....
      //  sellerId: {
      //   email: data.sellerId,
      //   nickName: data.nickname,
      //   region: data.wishRegion,
      //   title: data.title,//TODO: 의미없는 타이틀 -> 지울것임
      //   imageUrl: data.imageURLs[0],//TODO: 태초에 리스트였던 흔적, profile url string
      // },
      //}
      // private List<ChatMessage> messages;
    },
    {
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      // refetchOnMount: false,
    }
  );

  // console.log(data);

  useEffect(() => {
    let stompClient: Stomp.Client | null = null;
    // 웹소켓 연결을 수립합니다.
    //const socket = new SockJS("http://43.200.141.247:8080/chatting");
    const socket = new SockJS("https://rentalmarket.monster/chatting");
    // const socket = new SockJS("http://43.200.141.247:8080/chatting");
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

  // TODO: react query refetch 테스트위해서 잠시 주석 23.04.06 (목)
  useEffect(() => {
    queryClient.invalidateQueries("prevChat");
  }, [messages]);

  const sendMessage = () => {
    if (!stompClient) return;

    stompClient.send(
      "/pub/chat/message",
      {},
      JSON.stringify({
        roomId: roomId,
        sender: loginUserInfo.userNickName,
        receiver: data?.receiverName,
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

  //TODO: 채팅방 나가기
  // 실제 서버에서는 post가 아닌 delete로 해야 함
  // 나머지 url, data는 동일
  const leaveChatRoom = async () => {
    await axios.delete(
      `https://rentalmarket.monster/chat/room/${roomId}`,
      // `http://43.200.141.247:8080/chat/room/${roomId}`,
      // `http://43.200.141.247:8080/chat/room/delete/${roomId}`,
      {
        data: {
          nickname: loginUserInfo.userNickName,
        },
        headers: {
          Authorization: accessToken,
        },
      }
    );
    await queryClient.invalidateQueries("chatList");
    navigate("/chat/list");
  };

  return (
    <div className="divide-y px-5 md:px-28 lg:px-40">
      {rentalProduct &&
        (userId == rentalProduct.sellerId ? (
          <RentalProductItem product={rentalProduct} isSeller={true} />
        ) : (
          <RentalProductItem product={rentalProduct} />
        ))}

      <div>
        <div className="h-96 py-3.5 overflow-y-scroll scrollbar-hide">
          {/* 데이터를 불러오는 중이라면 isLoading 처리 */}
          {isSuccess &&
            data?.messages.map((prvChat: PrevChat) => (
              // 이전 채팅 내역들
              <ChatMessage key={prvChat.id} prevChat={prvChat} />
            ))}
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
        {rentalProduct && (
          <>
            <Link
              to={`/product/pay/${rentalProduct.id}`}
              className="btn btn-primary w-28 mt-5"
            >
              랜탈하기
            </Link>
            <div>
              <button
                onClick={leaveChatRoom}
                className="btn btn-error w-28 ml-4 mt-5"
              >
                채팅방 나가기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
