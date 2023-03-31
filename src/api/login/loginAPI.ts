import axios, { AxiosResponse } from "axios";

// 로그인
export const onLogin = async (loginValues: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await axios({
      method: "post",
      url: "http://52.78.150.154:8080/login",
      headers: {
        "content-type": "application/json",
      },
      data: loginValues,
    });

    // 로그인 성공한 경우
    // const { accessToken } = response.data.result.data.accessToken.split("")[1];
    const authToken = response.headers["x-auth-token"];
    console.log(response);

    // accessToken 설정
    // axios.defaults.headers.common["Authorization"] = `${accessToken}`;
    axios.defaults.headers.common["Authorization"] = `${authToken}`;

    return response;
  } catch (error: any) {
    console.log(error);
    if (error.status === 400) {
      // 아이디, 비밀번호가 틀렸을 경우
      console.log("아이디, 비밀번호 불일치!");

      throw error;
    }
    throw error;
  }
};

// 토큰 만료시 재요청
export const onSilentRefresh = async (retryCount = 0): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios({
      method: "post",
      url: "/users/refreshtoken",
      headers: {
        "content-type": "application/json",
      },
    });

    const token = response.data.token;
    axios.defaults.headers.common["Authorization"] = `${token}`;
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      if (retryCount < 5) {
        console.log(`재시도 횟수 (${retryCount + 1}/5)`);
        await new Promise((resolve) => setTimeout(resolve, 10000));
        return onSilentRefresh(retryCount + 1);
      } else {
        console.log(
          "토큰 재발행 요청 횟수를 초과하여 로그아웃 처리하였습니다!"
        );
      }
    } else if (error.response?.status === 403) {
      axios.defaults.headers.common["Authorization"] = ``;
      console.log("로그 아웃 처리!");
    }
    throw error;
  }
};
