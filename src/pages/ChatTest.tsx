import React, { useState, useEffect } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useParams } from "react-router-dom";

interface Message {
  roomId: string;
  sender: string;
  receiver: string;
  userProfile: any;
  message: string;
}

const Chat: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

  useEffect(() => {
    // 서버 End-point -> chatting
    const socket = new SockJS("http://43.200.141.247:8080/chatting");
    const stompClient = Stomp.over(socket);
    setStompClient(stompClient);
    stompClient.connect({}, () => {
      console.log("connected to server");
      // 스프링에서 메시지를 받고 -> subscribe url로 전달
      // -> 포워딩 된 메시지 데이터를 다시 roomId URL로 뿌려준다?
      // (대신, 채팅 인원들은 서로 roomId방을 구독하고 있어야 한다?)
      stompClient.subscribe(`/sub/${roomId}`, (message) => {
        const messageData = JSON.parse(message.body) as Message;
        console.log(messageData);
        setMessages([...messages, messageData]);
      });
    });

    return () => {
      stompClient.disconnect(() => {
        console.log("disconnected from server");
      });
    };
  }, [roomId]);

  const sendMessage = () => {
    stompClient?.send(
      "/pub/chat/message",
      {},
      JSON.stringify({
        roomId: roomId,
        sender: "정후",
        receiver: "관호님",
        userProfile: null,
        message: message,
      })
    );
    setMessage("");
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.message}</li>
        ))}
      </ul>
      <div>
        <input type="text" value={message} onChange={handleMessageChange} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
