import React, { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { token } from "../atoms/token";
import { userInfo } from "../atoms/userInfo";
import logo from "../assets/logo_sm.png";
interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useRecoilState(token);
  const [loginUserInfo, setLoginUserInfo] = useRecoilState(userInfo);
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);

  const logout = () => {
    setAccessToken("");
    setLoginUserInfo({
      userEmail: "",
      userNickName: "",
      userRegion: "",
      userProfileImage: "",
    });
    setDropDown(!dropDown);
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-between min-h-screen">
      {/* nav bar */}
      <div className="navbar bg-base-100 shrink-0 sticky top-0 z-[9999] border-b-2">
        <div className="flex-1">
          <img src={logo} className="w-12 mx-2" />
          <Link to="main" className="normal-case text-2xl font-semibold">
            RENTAL MARKET
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="main">렌탈하기</Link>
            </li>
            <li>
              <Link to="/product/create">렌탈등록</Link>
            </li>
            <li>
              <Link to="/chat/list">채팅</Link>
            </li>
            {!accessToken && (
              <>
                <li>
                  <Link
                    to="/login"
                    className="btn btn-primary btn-outline mx-2"
                  >
                    로그인
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="btn btn-primary text-white">
                    회원가입
                  </Link>
                </li>
              </>
            )}
            {accessToken && (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar hover:bg-transparent focus:outline-0 "
                >
                  <div
                    className="w-10 rounded-full"
                    onClick={(prev) => setDropDown(!prev)}
                  >
                    <img src={loginUserInfo.userProfileImage} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className={`${
                    dropDown ? "hidden" : "block"
                  } mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52`}
                >
                  <li>
                    <Link
                      to={`/my/*`}
                      className="justify-between"
                      onClick={() => setDropDown(!dropDown)}
                    >
                      마이페이지
                      {/* <span className="badge">New</span> */}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/my/products/*`}
                      onClick={() => setDropDown(!dropDown)}
                    >
                      나의 랜탈 내역
                    </Link>
                  </li>
                  <li onClick={logout}>
                    <span>로그아웃</span>
                  </li>
                </ul>
              </div>
            )}
          </ul>
        </div>
      </div>
      {/* contents */}
      <div className="container mx-auto grow py-5">
        <div>{children}</div>
      </div>
      {/* footer */}

      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded shrink-0">
        <div className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </div>
        <div>
          <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
