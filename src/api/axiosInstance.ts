import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";
import { token } from "../atoms/token";
import { useRecoilValue } from "recoil";

//SSL 인증된 서버 주소
const API_BASE_URL = "https://rentalmarket.monster";
const USER = "http://52.78.150.154:8080"; //TODO: SSL 확인필요
const CHAT = "http://43.200.141.247:8080"; //TODO: SSL 확인필요

export const createAxiosInstance = (baseURL: string = "") => {
  //const API_TOKEN = useRecoilValue(token);//TODO: hook 에러 나서
  const axiosInstance = axios.create({
    baseURL: `${baseURL}`,
    headers: {
      //Authorization: `${API_TOKEN}`,//TODO: 정후님 확인 필요
      "Content-Type": "application/json",
    },
    withCredentials: false, //TODO: 정후님 확인 필요
  });

  //intercepter

  return axiosInstance;
};

const api = {
  dev: createAxiosInstance(),
  devChat: createAxiosInstance(CHAT),
  devUser: createAxiosInstance(USER),
  prod: createAxiosInstance(API_BASE_URL),
};

export default api;
