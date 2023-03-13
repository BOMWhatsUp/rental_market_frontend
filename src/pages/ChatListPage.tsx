import React from "react";
import { ChatListItem } from "../components/ChatListItem";

export default function ChatListPage() {
  return (
    <div className="flex flex-col items-center px-5 md:px-28 lg:px-40">
      <h2 className="text-2xl md:text-xl">채팅 목록</h2>

      {/* 채팅방 리스트 -> 컴포넌트로 분류 필요 */}
      <ul className="divide-y">
        <ChatListItem />
        <ChatListItem />
        <ChatListItem />
      </ul>
    </div>
  );
}
