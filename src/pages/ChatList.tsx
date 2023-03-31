import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

const userProfile =
  "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

const initialRoomsState = {
  list: [
    {
      id: 1,
      productId: "레모나",
      chatList: [
        {
          receiver: "받은 사람(닉네임)",
          message: "안녕하세요",
          dateTime: "2023-03-24 10:00:00",
        },
        {
          receiver: "받은 사람(닉네임)",
          message: "안녕하세요~~",
          dateTime: "2023-03-24 10:00:30",
        },
        {
          receiver: "받은 사람(닉네임)",
          message: "해당 상품 렌탈 문의 드려요",
          dateTime: "2023-03-24 10:05:30",
        },
      ],
    },
    {
      id: 2,
      productId: "레모나",
      chatList: [
        {
          receiver: "받은 사람(닉네임)",
          message: "안녕하세요~",
          dateTime: "2023-03-24 10:00:00",
        },
        {
          receiver: "받은 사람(닉네임)",
          message: "안녕하세요~~",
          dateTime: "2023-03-24 10:00:30",
        },
        {
          receiver: "받은 사람(닉네임)",
          message: "제품에 이상은 없는걸까요?",
          dateTime: "2023-03-24 10:05:30",
        },
      ],
    },
    {
      id: 3,
      productId: "레모나",
      chatList: [
        {
          receiver: "받은 사람(닉네임)",
          message: "안녕하세요~",
          dateTime: "2023-03-24 10:00:00",
        },
        {
          receiver: "받은 사람(닉네임)",
          message: "안녕하세요~~",
          dateTime: "2023-03-24 10:00:30",
        },
        {
          receiver: "받은 사람(닉네임)",
          message: "제품에 이상은 없는걸까요?",
          dateTime: "2023-03-24 10:05:30",
        },
      ],
    },
  ],
};

const ChatList = () => {
  const [rooms, setRooms] = useState(initialRoomsState.list);

  // // 채팅 리스트 불러오기
  // // 근데 생각해보니 유저마다 불러오는 채팅 리스트가 다를텐데...?
  // // 유저마다 분별할 수 있는 특정 값이 필요로 할 것 같음.
  // -----> get으로 body에 userId ??
  // -----> accessToken 값을 통해서 검증 후 확인하는건지 email값을 확인 하는건지
  // const { data, isLoading, isError, error } = useQuery("ChatList", async () => {
  //   await axios
  //     // .get("/chat/list")
  //     .get("http://43.200.141.247:8080/chat/list")
  //     .then((res) => res.data);
  // });

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "chat/list",
  //     params: {
  //       // axios에서 get 할때는 params에 담아야 함..
  //       userId: userId,
  //     },
  //   }).then((response) => {
  //     setRooms(response.data);
  //   });
  // }, []);

  const listStyle = {
    width: "fit-content",
    padding: "1rem",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  };
  return (
    <div>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <Link to={`/chat/room/:${room.id}`} style={listStyle}>
              <img
                src={userProfile}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  marginRight: "1rem",
                }}
              />
              <span style={{ color: "black" }}>
                {room.chatList[room.chatList.length - 1].message}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
