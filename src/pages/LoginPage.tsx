import React, { useState } from "react";
import kakao from "../assets/kakao.svg";
import google from "../assets/google.svg";
import { useLogin } from "../hooks/useLogin";
import { useRecoilState } from "recoil";
import { token } from "../atoms/token";
import cookies from "react-cookies";
import { useNavigate } from "react-router-dom";
import { onSilentRefresh } from "../api/login/loginAPI";
import { userInfo } from "../atoms/userInfo";

export default function LoginPage() {
  // Access Token 전역 상태로 관리
  const [accessToken, setAccessToken] = useRecoilState(token);
  console.log(accessToken);
  // 서버로부터 전달 받는 로그인한 유저정보
  const [loginUserInfo, setLoginUserInfo] = useRecoilState(userInfo);
  // console.log(loginUserInfo);
  const navigate = useNavigate();
  const { loginMutation, silentRefreshMutation } = useLogin();
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });

  // 아이디, 비밀번호가 틀렸을 경우 true
  const [loginError, setLoginError] = useState({
    errorMessage: "",
    status: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const { email, password } = userInputs;
    console.log("이메일로 로그인 submit");

    // Server로 submit 기능 구현
    loginMutation.mutate(userInputs, {
      onSuccess: (response) => {
        console.log(response);
        if (response === undefined) return;
        // if (response?.response?.status === 400) {
        //   return setLoginError(!loginError);
        // }

        // 23.03.31
        // token값이랑, userInfo 값 수정하셔서 다시 받기로 함 (효진님)
        const { token, userInfo } = response.data;

        // Recoil 전역 상태로 accessToken, 유저정보 관리 해야함
        // 프로필 사진은 어떻게..??
        //  ===>  https://dj8fgxzkrerlh.cloudfront.net/이미지파일명
        setAccessToken(response.data);
        setLoginUserInfo(userInfo);
        // 토큰 만료 ??시간 전에 토큰 재갱신 => 유저가 인지하지 못하게 자동으로 토큰 재갱신
        // setTimeout(
        //   () =>
        //     silentRefreshMutation.mutate(accessToken, {
        //       onSuccess: (response) => {
        //         const { accessToken, refreshToken, data } = response;

        //         setAccessToken(accessToken);
        //       },
        //     }),
        //   5000 // 테스트하기 전에 임의로 시간 5초로 설정
        // );

        setUserInputs({
          email: "",
          password: "",
        });

        navigate("/main");
      },
      onError: (res: any) => {
        // 실패하는 경우는..
        // 1. 아이디, 비밀번호가 틀렸을 때
        // 2. 아이디가 존재하지 않을 때

        console.log("로그인 실패!");
        console.log(res);
        if (res?.response?.status === 400) {
          setLoginError({
            errorMessage: res?.response?.data,
            status: true,
          });
        }
      },
    });
  };

  return (
    <>
      <h1 className="text-primary font-extrabold text-center text-3xl mb-5">
        로그인
      </h1>
      <div>{accessToken}</div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs focus:outline-none focus:border-blue-500 focus:border-1"
              name="email"
              onChange={handleChange}
              value={userInputs.email}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xs focus:outline-none focus:border-blue-500 focus:border-1"
              name="password"
              onChange={handleChange}
              value={userInputs.password}
            />
          </div>
          <div className="text-error">
            {loginError.status && loginError.errorMessage}
          </div>
          <button type="submit" className="btn btn-primary btn-wide mt-5">
            로그인
          </button>
        </div>
      </form>

      <div className="flex flex-col items-center">
        <div className=" w-full max-w-xs">
          <div className="divider">or Sign up with </div>
          <div className="flex justify-center">
            <button className="btn btn-sm btn-ghost gap-2">
              <img src={kakao} />
              Kakao
            </button>
            <button className="btn btn-sm btn-ghost gap-2">
              <img src={google} />
              Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
