import React, { useState } from "react";

// DB있는 유저데이터라고 가정
const user = {
  email: "aa123@gmail.com",
  nickName: "레모나",
};

export default function SignUpPage() {
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    nickName: "",
    region: "",
    password: "",
    passwordCheck: "",
  });

  const [signUpInfoCheck, setSignUpInfoCheck] = useState({
    email: true,
    nickName: true,
  });

  console.log(signUpInfo);

  const onClickHandler = (key: string) => {
    // 추후 DB에서 email값이 있는지 체크 후 받은 boolean값으로 대체하면 될 듯..

    setSignUpInfoCheck({
      ...signUpInfoCheck,
      [key]: user[key] !== signUpInfo[key],
    });
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
  };

  const onSubmithandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 작성한 회원가입 정보를 서버로 전송하는 로직...

    // routing 설정 후 로그인 페이지로 이동 예정..
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <h2 className="text-center p-8">
          <div className="text-4xl text-blue-600 font-bold tracking-wide">
            렌탈마켓
          </div>
          <div className="text-4xl text-blue-600 font-bold tracking-wide">
            회원가입
          </div>
        </h2>

        <form onSubmit={onSubmithandler}>
          <div className="form-control w-full max-w-xs ">
            <div className="flex w-10/12 md:w-full">
              <input
                name="email"
                type="text"
                placeholder="email"
                className="mr-3 input input-bordered w-11/12  max-w-xs  focus:outline-none focus:border-blue-500 focus:border-1 shrink-0"
                onChange={onChangeHandler}
              />
              <button className="btn" onClick={() => onClickHandler("email")}>
                중복확인
              </button>
            </div>
            {!signUpInfoCheck.email && (
              <label className="label">
                <span className="label-text-alt text-error">
                  이미 사용중인 email 입니다.
                </span>
              </label>
            )}
          </div>
          <div className="form-control w-full max-w-xs shrink-0">
            <div className="flex w-10/12 md:w-full">
              <input
                name="nickName"
                type="text"
                placeholder="닉네임"
                className="mr-3 input input-bordered w-11/12 max-w-xs focus:outline-none focus:border-blue-500 focus:border-1 shrink-0"
                onChange={onChangeHandler}
              />
              <button
                className="btn"
                onClick={() => onClickHandler("nickName")}
              >
                중복확인
              </button>
            </div>
            {!signUpInfoCheck.nickName && (
              <label className="label">
                <span className="label-text-alt text-error">
                  이미 사용중인 닉네임입니다.
                </span>
              </label>
            )}
          </div>
          <div className="form-control mt-2.5 mb-8">
            <div className="input-group w-10/12 md:w-full">
              <input
                name="region"
                type="text"
                placeholder="주요 거래 장소 입력"
                className="input input-bordered w-11/12 max-w-xs focus:outline-none focus:border-blue-500 focus:border-1 focus:border-r-0 "
                onChange={onChangeHandler}
              />
              <button className="btn btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="form-control w-full max-w-xs mt-2.5 mb-2.5">
            <div className="flex w-10/12 md:w-full">
              <input
                name="password"
                type="password"
                placeholder="password"
                className="mr-3 input input-bordered w-11/12 max-w-xs focus:outline-none focus:border-blue-500 focus:border-1 shrink-0"
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="form-control w-full max-w-xs mb-8">
            <div className="flex w-10/12 md:w-full">
              <input
                name="passwordCheck"
                type="password"
                placeholder="password"
                className="mr-3 input input-bordered w-11/12 max-w-xs focus:outline-none focus:border-blue-500 focus:border-1 shrink-0"
                onBlur={onChangeHandler}
                onChange={onChangeHandler}
              />
            </div>
            {signUpInfo.passwordCheck !== signUpInfo.password && (
              <label className="label">
                <span className="label-text-alt text-error">
                  비밀번호가 일치하지 않습니다.
                </span>
              </label>
            )}
          </div>
          <button className="btn btn-primary">회원가입</button>
        </form>
      </div>
    </div>
  );
}
