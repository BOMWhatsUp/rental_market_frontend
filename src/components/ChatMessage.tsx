import { useRecoilValue } from "recoil";
import { userInfo } from "../atoms/userInfo";

export const ChatMessage = ({ prevChat }: any) => {
  const loginUserInfo = useRecoilValue(userInfo);
  return (
    <div
      className={`chat ${
        loginUserInfo.userNickName === prevChat.userName
          ? "chat-end"
          : "chat-start"
      } `}
      key={prevChat.id}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={loginUserInfo.userProfileImage} // 로그인한 유저 이미지 말고 상대방의 유저 이미지도 필요할 듯..
            alt="프로필 이미지"
          />
        </div>
      </div>
      <div className="chat-header font-medium">{prevChat.userName}</div>
      <div
        className={`flex ${
          loginUserInfo.userNickName === prevChat.userName
            ? "flex-row-reverse"
            : ""
        } items-end`}
      >
        <div
          className={`chat-bubble ${
            loginUserInfo.userNickName === prevChat.userName
              ? "bg-green-500"
              : ""
          }`}
        >
          {prevChat.message}
        </div>
        <time className="mx-1.5 chat-footer text-xs opacity-50">12:45</time>
      </div>
    </div>
  );
};
