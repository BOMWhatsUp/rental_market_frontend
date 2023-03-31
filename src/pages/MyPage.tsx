import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
type Message = {
  productId: string;
  productName: string;
  message: string;
  visited: boolean;
};
type UserProfile = {
  nickname: string;
  region: string;
};

export default function MyPage() {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile>({
    nickname: "커밋커밋",
    region: "인천시 부평구",
  });

  const handleChangeMode = () => {
    setIsEditMode((prev: boolean) => !prev);
  };

  const [alerts, setAlerts] = useState<Message[]>([
    {
      productId: "111",
      productName: "진로 두꺼비 인형",
      message: "반납일이 3일 남았습니다",
      visited: false,
    },
    {
      productId: "222",
      productName: "전동 자전거",
      message: "반납일이 2일 남았습니다",
      visited: false,
    },
    {
      productId: "333",
      productName: "정보처리기사필기 1권",
      message: "반납일이 3일 남았습니다",
      visited: false,
    },
  ]);

  const handleAlertClick = (e: React.MouseEvent<HTMLElement>) => {
    const productId = e.currentTarget.getAttribute("data-id");
    const changedAlerts = alerts.map((alert) =>
      alert.productId === productId ? { ...alert, visited: true } : alert
    );
    setAlerts(changedAlerts);
  };

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [`${e.target.name}`]: e.target.value,
    });
  };
  const alertList: JSX.Element[] = alerts.map((alert, index) =>
    !alert.visited ? (
      <div
        className="alert h-7 p-3 justify-between rounded-sm mb-1"
        key={alert.productId}
      >
        <div>
          <div className="text-xs">
            <Link to={"/product/detail/" + alert.productId} className="link">
              {alert.productName}
            </Link>
            의 반납일이 3일 남았어요!
          </div>
        </div>

        <div className="flex-none">
          <button
            className="btn btn-xs btn-ghost text-xs font-normal"
            data-id={alert.productId}
            onClick={handleAlertClick}
          >
            확인
          </button>
        </div>
      </div>
    ) : (
      <div key={index}></div>
    )
  );

  return (
    <>
      <div className="container px-5 md:px-28 lg:px-60">
        <div className="flex flex-col">
          <section className="w-full">
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-xl font-bold">프로필</h1>
              <label className="cursor-pointer label justify-end">
                <span className="label-text mr-2">프로필 편집</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={isEditMode}
                  onChange={handleChangeMode}
                />
              </label>
            </div>
            <div className="flex">
              <div className="avatar">
                <div className="sm:w-24 md:w-32 sm:h-24 md:h-32 rounded-xl">
                  <img src="https://mblogthumb-phinf.pstatic.net/MjAxNzEyMjRfMjI4/MDAxNTE0MDg2NDUwNjI5.k5-hTRT_vZ5Bl7EpZi2UMw9evuB60mDNntbIQv8g9mkg.oxXVl-OWkI4EdRGQiRXV0aySFIVPLyqE_eps5RP6zDsg.JPEG.rathilda/image_6243704931514086396184.jpg?type=w800" />
                </div>
              </div>
              {!isEditMode ? (
                <div className="pl-3 flex flex-col">
                  <p className="text-lg font-bold">{profile.nickname}</p>
                  <p className="text-sm font-normal">kermit@naver.com</p>
                  <p className="text-sm font-normal">인천시 부평구</p>
                </div>
              ) : (
                <div className="pl-3 flex flex-col">
                  <div className="form-control w-full max-w-xs mb-2">
                    <label className="label p-0">
                      <span className="label-text">닉네임</span>
                    </label>
                    <input
                      type="text"
                      placeholder="닉네임"
                      className="input input-bordered w-full max-w-xs input-sm"
                      name="nickname"
                      value={profile.nickname}
                      onChange={handleChangeProfile}
                    />
                  </div>
                  <div className="form-control w-full max-w-xs mb-2">
                    <label className="label p-0">
                      <span className="label-text">주요 거래 지역</span>
                    </label>
                    <input
                      type="text"
                      placeholder="주요 거래 지역"
                      className="input input-bordered w-full max-w-xs input-sm"
                      name="region"
                      value={profile.region}
                      onChange={handleChangeProfile}
                    />
                  </div>
                  <div className="form-control w-full max-w-xs mb-2">
                    <label className="label p-0">
                      <span className="label-text">프로필사진 업로드</span>
                    </label>
                    <input
                      type="file"
                      className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                    />
                  </div>

                  <button className="btn btn-primary btn-sm">저장</button>
                </div>
              )}
            </div>
          </section>
          <section className="w-full mt-5">
            <Link to="/my/products">
              <div className="stats stats-vertical sm:stats-horizontal shadow w-full">
                <div className="stat p-3">
                  <div className="stat-title text-base">빌린 내역</div>
                  <div className="stat-value text-3xl">12</div>
                  <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat p-3">
                  <div className="stat-title text-base">빌려준 내역</div>
                  <div className="stat-value text-3xl">34</div>
                  <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>
                <div className="stat p-3">
                  <div className="stat-title text-base">내 상품</div>
                  <div className="stat-value text-3xl">34</div>
                  <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                {/* <div className="stat p-3">
                  <div className="stat-title text-base">수익</div>
                  <div className="stat-value text-3xl">123,958</div>
                  <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div> */}
              </div>
            </Link>
          </section>
          <section className="w-full mt-5">
            <h3 className="font-semibold mb-3">최근 알림 내역</h3>
            {alertList}
          </section>
        </div>
      </div>
    </>
  );
}
