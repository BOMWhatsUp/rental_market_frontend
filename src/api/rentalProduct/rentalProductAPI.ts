import { axiosInstance, axiosFormInstance } from "../axiosInstance";
import { RentalProduct, RentalProductDetail } from "../../types/product";

//create
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

//read
export const getProducts = async (
  categoryName: string = "",
  userRegion: string = "",
  keyword: string = "",
  status: string = "",
  page: number = 1,
  size: number = 5
) => {
  const res = await axiosInstance.get<RentalProduct[]>(
    //`/api/products?page=${page}&size=${size}&categoryName=${categoryName}&wishRegion=${wishRegion}&keyword=${keyword}&status=${status}`,
    //`http://3.37.196.93:8080/products?page=${page}&size=${size}&category-name=${categoryName}&wishRegion=${wishRegion}&keyword=${keyword}&status=${status}`,
    `http://3.37.196.93:8080/products?page=${page}&size=${size}&category-name=${categoryName}&keyword=${keyword}&userRegion=${userRegion}&status=${status}`
    //`http://3.37.196.93:8080/products`,
    //{ params: { page, size, categoryName } }
    // keyword, status, userRegion
  );
  return res.data;
};

export const getProduct = async (id: string) => {
  const res = await axiosInstance.get<RentalProductDetail>(
    `/api/products/detail/${id}`
    // `http://3.37.196.93:8080/products/${id}/detail`
  );
  return res.data;
};

export const getPayProduct = async (id: string) => {
  const res = await axiosInstance.get<RentalProductDetail>(
    `/api/products/pay/${id}`
    // `http://3.37.196.93:8080/products/${id}/detail`
  );
  return res.data;
};

//update

//delete
export const deleteProduct = async (id: string) => {
  const res = await axiosInstance.delete(`/api/products/delete/${id}`);
  return res;
};
