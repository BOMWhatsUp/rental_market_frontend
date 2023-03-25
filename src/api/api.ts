import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";

const API_BASE_URL = "/";
const API_TOKEN = "your_api_token"; // 서버에서 받아온 안전한 accountToken 사용

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosFormInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});
// async function fetchCall<T>(url: string, data: any): Promise<T> {
//   try {
//     const response = await axiosInstance.post<T>(url, data);
//     return response.data;
//   } catch (error) {
//     const axiosError = error as AxiosError;
//     // Handle errors here
//     throw axiosError;
//   }
// }

//fetch 공통...
export async function fetchMore<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> = await axios.get(url, options);
  //console.log(response.data.data);
  return response.data;
}
