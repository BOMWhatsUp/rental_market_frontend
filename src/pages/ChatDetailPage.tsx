import React from "react";
import RentalProductItem from "../components/RentalProductItem";

export default function ChatDetailPage() {
  return (
    <div className="divide-y px-5 md:px-28 lg:px-40">
      <RentalProductItem />
      <div>
        <div className="h-96 py-3.5 overflow-y-scroll scrollbar-hide">
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://cdn4.buysellads.net/uu/1/127419/1670532177-Stock.jpg" />
              </div>
            </div>
            <div className="chat-header font-medium">라라라</div>
            {/* 본인이 아니면 flex-row-reverse */}
            <div className="flex flex-row-reverse items-end">
              <div className="chat-bubble bg-green-500">안녕하세요.</div>
              <time className="mx-1.5 chat-footer text-xs opacity-50">
                12:45
              </time>
            </div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-header font-medium">레모나</div>
            <div className="flex items-end">
              <div className="chat-bubble">안녕하세요!!</div>
              <time className="mx-1.5 chat-footer text-xs opacity-50">
                12:46
              </time>
            </div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://cdn4.buysellads.net/uu/1/127419/1670532177-Stock.jpg" />
              </div>
            </div>
            <div className="chat-header font-medium">라라라</div>
            {/* 본인이 아니면 flex-row-reverse */}
            <div className="flex flex-row-reverse items-end">
              <div className="chat-bubble bg-green-500">안녕하세요.</div>
              <time className="mx-1.5 chat-footer text-xs opacity-50">
                12:45
              </time>
            </div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-header font-medium">레모나</div>
            <div className="flex items-end">
              <div className="chat-bubble">안녕하세요!!</div>
              <time className="mx-1.5 chat-footer text-xs opacity-50">
                12:46
              </time>
            </div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://cdn4.buysellads.net/uu/1/127419/1670532177-Stock.jpg" />
              </div>
            </div>
            <div className="chat-header font-medium">라라라</div>
            {/* 본인이 아니면 flex-row-reverse */}
            <div className="flex flex-row-reverse items-end">
              <div className="chat-bubble bg-green-500">안녕하세요.</div>
              <time className="mx-1.5 chat-footer text-xs opacity-50">
                12:45
              </time>
            </div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-header font-medium">레모나</div>
            <div className="flex items-end">
              <div className="chat-bubble">안녕하세요!!</div>
              <time className="mx-1.5 chat-footer text-xs opacity-50">
                12:46
              </time>
            </div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://cdn4.buysellads.net/uu/1/127419/1670532177-Stock.jpg" />
              </div>
            </div>
            <div className="chat-header font-medium">라라라</div>
            {/* 본인이 아니면 flex-row-reverse */}
            <div className="flex flex-row-reverse items-end">
              <div className="chat-bubble bg-green-500">안녕하세요.</div>
              <time className="mx-1.5 chat-footer text-xs opacity-50">
                12:45
              </time>
            </div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-header font-medium">레모나</div>
            <div className="flex items-end">
              <div className="chat-bubble">안녕하세요!!</div>
              <time className="mx-1.5 chat-footer text-xs opacity-50">
                12:46
              </time>
            </div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://cdn4.buysellads.net/uu/1/127419/1670532177-Stock.jpg" />
              </div>
            </div>
            <div className="chat-header font-medium">라라라</div>
            {/* 본인이 아니면 flex-row-reverse */}
            <div className="flex flex-row-reverse items-end">
              <div className="chat-bubble bg-green-500">안녕하세요.</div>
              <time className="mx-1.5 chat-footer text-xs opacity-50">
                12:45
              </time>
            </div>
          </div>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-header font-medium">레모나</div>
            <div className="flex items-end">
              <div className="chat-bubble">안녕하세요!!</div>
              <time className="mx-1.5 chat-footer text-xs opacity-50">
                12:46
              </time>
            </div>
          </div>
        </div>
        <label className="relative">
          <input
            type="text"
            placeholder="메시지를 입력해주세요."
            className="input input-bordered w-full max-w-10/12 focus:outline-0"
          />
          <button className="absolute top-[-2px] right-[11px]">
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
        <button className="btn btn-primary w-28">랜탈하기</button>
      </div>
    </div>
  );
}
