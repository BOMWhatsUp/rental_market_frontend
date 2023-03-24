import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

export async function fetchMore<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> = await axios.get(url, options);
  //console.log(response.data.data);
  return response.data;
}
