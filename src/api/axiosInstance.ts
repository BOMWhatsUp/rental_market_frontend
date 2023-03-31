import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";

//TODO : user token, user info 다루는 atom 가져와서, header에 토큰 실어주면 되겠네요!
//import { token } from "../atoms/token";
//import { useRecoilValue } from "recoil";

//TODO: 서버 주소 입력
const API_BASE_URL = "";
//const API_TOKEN = useRecoilValue(token); // 서버에서 받아온 안전한 accountToken 사용
const API_TOKEN = "token"; // 임시
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    //Authorization: `${API_TOKEN}`,
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export const axiosFormInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    //Authorization: `${API_TOKEN}`,
    "Content-Type": "multipart/form-data",
  },
  withCredentials: false,
});
