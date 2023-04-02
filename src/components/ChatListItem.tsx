import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfo } from "../atoms/userInfo";

export const ChatListItem = ({ roomId, productId, lastChatMsg }: any) => {
  const loginUserInfo = useRecoilValue(userInfo);
  return (
    <li className="card w-fit bg-base-100  rounded-none hover:bg-neutral-100 ease-out duration-100 cursor-pointer">
      <Link
        to={`/chat/room?roomId=${roomId}&senderId=${loginUserInfo.userNickName}`}
      >
        <div className="card-actions flex items-center flex-nowrap p-6 h-28">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div className="w-72 ml-1.5 mr-5">
            <div className="flex items-center justify-between">
              <span className="font-medium ">유저 이름</span>
              <span className="text-[13px] font-light">12:00 PM {">"}</span>
            </div>
            <p className="line-clamp-2 leading-5 text-sm font-light">
              {lastChatMsg}
            </p>
          </div>
          <div className="avatar">
            <div className="w-20 rounded-xl">
              <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
