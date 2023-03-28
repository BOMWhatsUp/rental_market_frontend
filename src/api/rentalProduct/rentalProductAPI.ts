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
    { params: { page, size, categoryName, wishRegion, keyword, status } }
  );
  return res.data;
};

export const addProduct = async (formData: FormData) => {
  // return await axiosInstance.post("/api/product", formData, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // });
  return await axiosInstance.post(
    "http://3.37.196.93:8080/products/create",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
