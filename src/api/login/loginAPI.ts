import axios, { AxiosResponse } from "axios";
// import cookies from "react-cookies";
// import { useRecoilState } from "recoil";
// import { token } from "../../atoms/token";

export const onLogin = async (loginValues: {
  email: string;
  password: string;
}) => {
  return await axios({
    method: "post",
    url: "/users/login",
    headers: {
      "content-type": "application/json",
    },
    data: loginValues,
  })
    .then((response) => {
      const { accessToken } = response.data;

      // accessToken 설정
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      return response.data;
    })
    .catch((error) => {
      if (error.response.statusText === "miss match") {
        // 아이디, 비밀번호가 틀렸을 경우

        console.log("아이디, 비밀번호 불일치!");
        return error;
      }
    });
};

export const onSilentRefresh = async (token: any) => {
  return await axios({
    method: "post",
    url: "/users/refreshtoken",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      const { accessToken } = response.data;

      // // 해더에 재발급 된 accessToken 설정
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setTimeout(() => onSilentRefresh(accessToken), 5000);
      return response.data;
    })
    .catch((error) => {
      // ... 로그인 실패 처리
    });
};
