import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfo } from "../atoms/userInfo";
import moment from "moment";
import axios from "axios";
import { useQueryClient } from "react-query";
import { useState } from "react";

export const ChatListItem = ({ list }: any) => {
  const loginUserInfo = useRecoilValue(userInfo);
  const queryClient = useQueryClient();
  //TODO: 채팅방 나가기
  // 따로 분리 시켜야 함.
  const leaveChatRoom = async (roomId: string) => {
    await axios.delete(`https://rentalmarket.monster/chat/room/${roomId}`, {
      // headers: {
      //   Authorization: accessToken,
      // },
    });

    //TODO: 체크해야 할 부분 23.04.05 (수) - 채팅 리스트 페이지 바로 적용 안됨
    await queryClient.invalidateQueries("chatList");
  };

  const [hover, setHover] = useState(false);

  return (
    <>
      <li
        className="card w-fit bg-base-100  rounded-none hover:bg-neutral-100 ease-out duration-100 cursor-pointer relative"
        onMouseEnter={() => setHover((prev) => !prev)}
        onMouseLeave={() => setHover((prev) => !prev)}
      >
        <Link
          to={`/chat/room/${list.roomId}?nickname=${loginUserInfo.userNickName}`}
        >
          <div className="card-actions flex items-center flex-nowrap p-6 h-28">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img
                  src={`https://dj8fgxzkrerlh.cloudfront.net/${list.product.sellerId.imageUrl}`}
                />
              </div>
            </div>
            <div className="w-72 ml-1.5 mr-5">
              <div className="flex items-center justify-between">
                <span className="font-medium ">{list.receiverNickName}</span>
                <span className="text-[13px] font-light">
                  {moment(list.latelySenderDate).format("YY.MM.DD HH:mm")}
                  {">"}
                </span>
              </div>
              <p className="line-clamp-2 leading-5 text-sm font-light">
                {list.message}
              </p>
            </div>
            <div className="avatar">
              <div className="w-20 rounded-xl">
                <img
                  src={`https://dj8fgxzkrerlh.cloudfront.net/${list.product.mainImageUrl}`}
                />
              </div>
            </div>
          </div>
        </Link>
        {hover && (
          <button
            className="btn btn-ghost text-error btn-xs md:btn-sm text-lg lg:text-xl absolute top-0 right-0"
            onClick={() => (list ? leaveChatRoom(list.roomId) : "")}
          >
            ×
          </button>
        )}
      </li>
    </>
  );
};
