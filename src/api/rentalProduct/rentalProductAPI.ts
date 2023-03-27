import { axiosInstance, axiosFormInstance } from "../axiosInstance";
import { RentalProduct } from "../../types/product";

export const getProducts = async (
  categoryName: string = "",
  wishRegion: string = "",
  keyword: string = "",
  status: string = "",
  page: number = 1,
  size: number = 5
) => {
  const res = await axiosInstance.get<RentalProduct[]>(
    `/api/products?page=${page}&size=${size}&categoryName=${categoryName}&wishRegion=${wishRegion}&keyword=${keyword}&status=${status}`,
    { params: { page, size, categoryName, wishRegion, keyword } }
  );
  return res.data;
};
