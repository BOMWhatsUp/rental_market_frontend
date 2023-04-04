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
import jwtDecode from "jwt-decode";
import axios from "axios";

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

        const decodedToken = jwtDecode(response.data);
        console.log(decodedToken); // 디코딩된 토큰 값 출력

        // 23.03.31
        // token값이랑, userInfo 값 수정하셔서 다시 받기로 함 (효진님)
        // const { token, userInfo } = response.data;

        // Recoil 전역 상태로 accessToken, 유저정보 관리 해야함
        // 프로필 사진은 어떻게..??
        //  ===>  https://dj8fgxzkrerlh.cloudfront.net/이미지파일명
        setAccessToken(response.data);

        // !!!!!!!!!!!!!!!! ----------------------test----------------------- !!!!!!!!!!!!!!!!!
        // (23.03.31) oken decode 후 프로퍼티 이름 다시 확인 후 수정
        setLoginUserInfo({
          userEmail: decodedToken["sub"],
          userNickName: decodedToken["nickName"],
          userRegion: decodedToken["region"],
          userProfileImage: decodedToken["userProfileImage"]
            ? `https://dj8fgxzkrerlh.cloudfront.net/${decodedToken["userProfileImage"]}`
            : "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
        });
        // !!!!!!!!!!!!!!!! ----------------------test----------------------- !!!!!!!!!!!!!!!!!

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
        // token decode
        const decodedToken = jwtDecode(
          "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtdW4yMkB0ZXN0LmNvbSIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJuaWNrTmFtZSI6Iu2aqOynhDIyIiwicmVnaW9uIjoi7ISc7Jq4IOqwleu2geq1rCIsInByb2ZpbGVJbWciOiIiLCJpYXQiOjE2ODAyNTAyNTYsImV4cCI6MTY4MDI1MjA1Nn0.o0MvJjs_InylNto3Oy_geP-bzu61sp2KJEqOtcFvX34"
        );

        console.log(decodedToken); // 디코딩된 토큰 값 출력

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
      <h2 className="text-center p-8">
        <div className="text-4xl text-primary font-bold tracking-wide">
          로그인
        </div>
      </h2>

      <div className="alert shadow-lg max-w-xs mx-auto mb-9">
        <div className="pl-2">
          <span>회원만 렌탈마켓을 이용할 수 있어요! 😀</span>
        </div>
      </div>

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
              autoComplete="email"
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
              autoComplete="current-password"
            />
          </div>
          <div className="text-error">
            {loginError.status && loginError.errorMessage}
          </div>
          <button type="submit" className="btn btn-primary btn-wide mt-10">
            로그인
          </button>
        </div>
      </form>

      {/* <div className="flex flex-col items-center">
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
      </div> */}
    </>
  );
}
