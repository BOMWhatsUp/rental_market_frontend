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
      <div className="container mx-auto grow pt-5 pb-12">
        <div>{children}</div>
      </div>
      {/* footer */}

      <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded shrink-0">
        <div className="grid grid-flow-col gap-4">
          <p>RENT IT ALL!</p>
        </div>

        <div>
          <p>Copyright © 2023 - Rental Market by BOMWhatsUp</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
