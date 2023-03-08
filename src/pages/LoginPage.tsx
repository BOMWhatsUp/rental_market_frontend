import React, { useState } from "react";
import kakao from "../assets/kakao.svg";
import google from "../assets/google.svg";
export default function LoginPage() {
  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInputs({ ...userInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = userInputs;
    console.log("이메일로 로그인 submit");
    setUserInputs({
      email: "",
      password: "",
    });
    //TODO Server 로 submit 기능 구현
  };

  return (
    <>
      <h1 className="text-primary font-extrabold text-center text-3xl mb-5">
        로그인
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered input-primary w-full max-w-xs"
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
              className="input input-bordered input-primary w-full max-w-xs"
              name="password"
              onChange={handleChange}
              value={userInputs.password}
            />
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
            <button className="btn btn btn-sm btn-ghost gap-2">
              <img src={kakao} />
              Kakao
            </button>
            <button className="btn btn btn-sm btn-ghost gap-2">
              <img src={google} />
              Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
