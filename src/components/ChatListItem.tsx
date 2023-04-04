import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfo } from "../atoms/userInfo";
import moment from "moment";
export const ChatListItem = ({ list }: any) => {
  const loginUserInfo = useRecoilValue(userInfo);

  return (
    <>
      <li className="card w-fit bg-base-100  rounded-none hover:bg-neutral-100 ease-out duration-100 cursor-pointer">
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
      </li>
    </>
  );
};
