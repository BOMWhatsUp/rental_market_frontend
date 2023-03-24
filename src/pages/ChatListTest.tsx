import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
  ],
};

const ChatList = () => {
  const [rooms, setRooms] = useState(initialRoomsState.list);

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
            <Link to={`/test/chat/:${room.id}`} style={listStyle}>
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
