import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";
import { token } from "../atoms/token";
import { useRecoilValue } from "recoil";

//SSL 인증된 서버 주소
const API_BASE_URL = "https://rentalmarket.monster";
const USER = "http://52.78.150.154:8080"; //TODO: SSL 확인필요
const CHAT = "http://43.200.141.247:8080"; //TODO: SSL 확인필요

export const createAxiosInstance = (baseURL: string = "") => {
  //const API_TOKEN = useRecoilValue(token);
  const axiosInstance = axios.create({
    baseURL: `${baseURL}`,
    headers: {
      //Authorization: `${API_TOKEN}`,
      "Content-Type": "application/json",
    },
    withCredentials: false,
  });

  //TODO: 로그인 유지를 위한 부분
  //TODO: 현재는 해당 instance 를 product 관련에만 사용하고 있어서, 이 기능 활용 하려면 전부 이거로 바꿔야 합니다.
  // 요청 인터셉터 설정
  // axiosInstance.interceptors.request.use(
  //   (config) => {
  //     // 세션에서 인증 토큰 가져오기
  //     const token = sessionStorage.getItem('token');

  // 쿠키에서 인증 토큰 가져오기
  // const token = document.cookie.replace(
  //   /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
  //   '$1'
  // );
  //     // 가져온 토큰이 있다면 요청 헤더에 추가
  //     if (token) {
  //       config.headers.Authorization = `${token}`;
  //     }

  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  return axiosInstance;
};

const api = {
  dev: createAxiosInstance(),
  devChat: createAxiosInstance(CHAT),
  devUser: createAxiosInstance(USER),
  prod: createAxiosInstance(API_BASE_URL),
};

export default api;
