import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// DB있는 유저데이터라고 가정
const user = {
  email: "aa123@gmail.com",
  nickName: "레모나",
};

// 정규식 로직
const initialErrorData: any = {
  email: "",
  nickName: "",
  region: "",
  password: "",
  passwordCheck: "",
};

const EMAIL_REGEX = new RegExp(
  "^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$"
);
const NICKNAME_REGEX = new RegExp("^[ㄱ-ㅎㅏ-ㅣ가-힣]{2,8}$");
const PASSWORD_REGEX = new RegExp("^[a-zA-Z0-9]{8,16}$");

const ERROR_MSG = {
  required: "필수 정보입니다.",
  invalidEmail: "올바른 이메일을 입력해주세요.",
  invalidNickName: "2~8자 한글을 사용하세요.",
  invalidRegion: "주요 거래 장소를 입력해주세요.",
  invalidPw: "8~16자 영문, 숫자를 사용하세요.",
  invalidConfirmPw: "비밀번호가 일치하지 않습니다.",
};

const CHECK_MSG = {
  isValidEmail: "가입 가능한 이메일입니다.",
  invalidEmail: "이미 가입한 이메일입니다.",
  isValidNickName: "사용 가능한 닉네임입니다.",
  invalidNickName: "이미 사용중인 닉네임입니다.",
};

export default function SignUpPage() {
  const navigte = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    nickName: "",
    region: "",
    password: "",
    passwordCheck: "",
  });

  // 정규식 로직
  const [errorData, setErrorData] = useState(initialErrorData);

  const [signUpInfoCheck, setSignUpInfoCheck]: any = useState({
    email: "",
    nickName: "",
  });

  const onClickHandler = (key: string) => {
    // 추후 DB에서 email값이 있는지 체크 후 받은 boolean값으로 대체하면 될 듯..

    setSignUpInfoCheck({
      ...signUpInfoCheck,
      [key]: user[key] === signUpInfo[key],
    });
  };

  // 정규식 체크
  const checkRex = (inputName: string, inputValue: string) => {
    let result: string | boolean;
    let value = inputValue;

    if (value.length === 0) {
      result = "required";
    } else {
      switch (inputName) {
        case "email":
          result = EMAIL_REGEX.test(value) ? true : "invalidEmail";
          break;
        case "nickName":
          result = NICKNAME_REGEX.test(value) ? true : "invalidNickName";
          break;
        case "region":
          result = value.length > 6 ? true : "invalidRegion";
          break;
        case "password":
          result = PASSWORD_REGEX.test(value) ? true : "invalidPw";
          checkRex("passwordCheck", signUpInfo["passwordCheck"]);
          break;
        case "passwordCheck":
          result = value === signUpInfo["password"] ? true : "invalidConfirmPw";
          break;
        default:
          return;
      }
    }
    setErrorData((prev: any) => ({ ...prev, [inputName]: result }));
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpInfo({ ...signUpInfo, [e.target.name]: e.target.value });
    checkRex(e.target.name, e.target.value);
  };

  const onSubmithandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 작성한 회원가입 정보를 서버로 전송하는 로직...

    isValid && isValidCheck && navigte("/login");
  };

  const isValid = Object.values(errorData).every((value) => value === true);
  const isValidCheck = Object.values(signUpInfoCheck).every(
    (value) => value === false
  );

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
          <div className="form-control w-full max-w-xs h-28">
            <label className="label">
              <span className="label-text">이메일</span>
            </label>
            <div className="flex w-10/12 md:w-full">
              <input
                name="email"
                type="text"
                placeholder="email"
                className={`mr-3 input input-bordered w-11/12  max-w-xs  focus:outline-none focus:border-blue-500 focus:border-1 shrink-0 ${
                  errorData["email"].length === 0
                    ? ""
                    : errorData["email"] === true
                    ? ""
                    : "border-red-500"
                }`}
                value={signUpInfo["email"]}
                onBlur={onChangeHandler}
                onChange={onChangeHandler}
                autoFocus
              />
              <button
                className={`btn ${
                  errorData["email"] === true ? "" : "btn-disabled"
                }`}
                type="button"
                onClick={() => onClickHandler("email")}
              >
                중복확인
              </button>
            </div>

            <label className="label">
              <span className="label-text-alt text-error">
                {errorData !== true ? ERROR_MSG[errorData["email"]] : ""}

                {signUpInfoCheck.email === true &&
                errorData.email === true &&
                signUpInfoCheck.email !== ""
                  ? CHECK_MSG["invalidEmail"]
                  : signUpInfoCheck.email !== true &&
                    errorData.email === true &&
                    signUpInfoCheck.email !== ""
                  ? CHECK_MSG["isValidEmail"]
                  : ""}
              </span>
            </label>
          </div>
          <div className="form-control w-full max-w-xs shrink-0 h-28">
            <label className="label">
              <span className="label-text">닉네임</span>
            </label>
            <div className="flex w-10/12 md:w-full">
              <input
                name="nickName"
                type="text"
                placeholder="닉네임"
                className={`mr-3 input input-bordered w-11/12 max-w-xs focus:outline-none focus:border-blue-500 focus:border-1 shrink-0 ${
                  errorData["nickName"].length === 0
                    ? ""
                    : errorData["nickName"] === true
                    ? ""
                    : "border-red-500"
                }`}
                value={signUpInfo["nickName"]}
                onBlur={onChangeHandler}
                onChange={onChangeHandler}
              />
              <button
                className={`btn ${
                  errorData["nickName"] === true ? "" : "btn-disabled"
                }`}
                type="button"
                onClick={() => onClickHandler("nickName")}
              >
                중복확인
              </button>
            </div>
            <label className="label">
              <span className="label-text-alt text-error">
                {errorData !== true ? ERROR_MSG[errorData["nickName"]] : ""}

                {signUpInfoCheck.nickName === true &&
                errorData.nickName === true &&
                signUpInfoCheck.nickName !== ""
                  ? CHECK_MSG["invalidNickName"]
                  : signUpInfoCheck.nickName !== true &&
                    errorData.nickName === true &&
                    signUpInfoCheck.nickName !== ""
                  ? CHECK_MSG["isValidNickName"]
                  : ""}
              </span>
            </label>
          </div>
          <div className="form-control h-28">
            <label className="label">
              <span className="label-text">주요 거래 장소</span>
            </label>
            <div className="input-group w-10/12 md:w-full">
              <input
                name="region"
                type="text"
                placeholder="주요 거래 장소 입력"
                className={`input input-bordered w-11/12 max-w-xs focus:outline-none focus:border-blue-500 focus:border-1 focus:border-r-0 ${
                  errorData["region"].length === 0
                    ? ""
                    : errorData["region"] === true
                    ? ""
                    : "border-red-500"
                }`}
                value={signUpInfo["region"]}
                onBlur={onChangeHandler}
                onChange={onChangeHandler}
                autoComplete="off"
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
            <label className="label">
              <span className="label-text-alt text-error">
                {errorData !== true ? ERROR_MSG[errorData["region"]] : ""}
              </span>
            </label>
          </div>
          <div className="form-control w-full max-w-xs h-28">
            <label className="label">
              <span className="label-text">비밀번호</span>
            </label>
            <div className="flex w-10/12 md:w-full">
              <input
                name="password"
                type="password"
                placeholder="비밀번호"
                className={`mr-3 input input-bordered w-11/12 max-w-xs focus:outline-none focus:border-blue-500 focus:border-1 shrink-0 ${
                  errorData["password"].length === 0
                    ? ""
                    : errorData["password"] === true
                    ? ""
                    : "border-red-500"
                }`}
                value={signUpInfo["password"]}
                onBlur={onChangeHandler}
                onChange={onChangeHandler}
                autoComplete="off"
              />
            </div>
            <label className="label">
              <span className="label-text-alt text-error">
                {errorData !== true ? ERROR_MSG[errorData["password"]] : ""}
              </span>
            </label>
          </div>
          <div className="form-control w-full max-w-xs mb-8 h-20">
            <label className="label">
              <span className="label-text">비밀번호 확인</span>
            </label>
            <div className="flex w-10/12 md:w-full">
              <input
                name="passwordCheck"
                type="password"
                placeholder="비밀번호 확인"
                className={`mr-3 input input-bordered w-11/12 max-w-xs focus:outline-none focus:border-blue-500 focus:border-1 shrink-0 ${
                  errorData["passwordCheck"].length === 0
                    ? ""
                    : errorData["passwordCheck"] === true
                    ? ""
                    : "border-red-500"
                }`}
                value={signUpInfo["passwordCheck"]}
                onBlur={onChangeHandler}
                onChange={onChangeHandler}
                autoComplete="off"
              />
            </div>
            <label className="label">
              <span className="label-text-alt text-error">
                {errorData !== true
                  ? ERROR_MSG[errorData["passwordCheck"]]
                  : ""}
              </span>
            </label>
          </div>
          <button
            type="submit"
            className={`btn ${
              isValid && isValidCheck ? "btn-primary" : "btn-disabled"
            } w-28 `}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
