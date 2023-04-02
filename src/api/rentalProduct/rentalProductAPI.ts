import { axiosInstance, axiosFormInstance } from "../axiosInstance";
import {
  RentalProduct,
  RentalProductDetail,
  RentalProductHistory,
} from "../../types/product";
import { useMutation } from "react-query";

//create
export const addProduct = async (formData: FormData) => {
  return await axiosInstance.post(
    "https://rentalmarket.monster/product",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

//create
export const addTransaction = async (form: {
  productId: string;
  userId: string;
  days: number;
  totalPrice: number;
}) => {
  const data = {
    userId: form.userId,
    days: form.days,
    totalPrice: form.totalPrice,
  };
  console.log(data, form.productId);
  return await axiosInstance.post(
    `https://rentalmarket.monster/payment/product/${form.productId}`,
    data
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
    //mocking
    //`/api/products?page=${page}&size=${size}&categoryName=${categoryName}&wishRegion=${userRegion}&keyword=${keyword}&status=${status}`
    //local http server
    //`http://3.37.196.93:8080/products?page=${page}&size=${size}&category-name=${categoryName}&keyword=${keyword}&userRegion=${userRegion}&status=${status}`
    //vercel https server
    `https://rentalmarket.monster/products?page=${page}&size=${size}&category-name=${categoryName}&keyword=${keyword}&userRegion=${userRegion}&status=${status}`
    //proxy
    //`/api/products?page=${page}&size=${size}&category-name=${categoryName}&keyword=${keyword}&userRegion=${userRegion}&status=${status}`
  );
  return res.data;
};

export const getProduct = async (id: string) => {
  const res = await axiosInstance.get<RentalProductDetail>(
    //mocking
    //`/api/products/detail/${id}`
    //local http server
    // `http://3.37.196.93:8080/product/${id}`
    //vercel https server
    `https://rentalmarket.monster/product/${id}`
  );
  return res.data;
};

export const getPayProduct = async (id: string) => {
  const res = await axiosInstance.get<RentalProductDetail>(
    //`/api/products/pay/${id}`
    `https://rentalmarket.monster/payment/product/${id}`
  );
  return res.data;
};

export const getSellerHistoryProducts = async (
  isSeller: boolean = false,
  userId: string = "",
  page: number = 1,
  size: number = 5
) => {
  let res;
  if (isSeller) {
    res = await axiosInstance.get<RentalProductHistory[]>(
      //`/api/seller/history?page=${page}&size=${size}&userId=${userId}`
      `https://rentalmarket.monster/history/${userId}/seller?page=${page}&size=${size}`
    );
  } else {
    res = await axiosInstance.get<RentalProductHistory[]>(
      //`/api/buyer/history?page=${page}&size=${size}&userId=${userId}`
      `https://rentalmarket.monster/history/${userId}/buyer?page=${page}&size=${size}`
    );
  }
  console.log(isSeller, userId, page, size);
  return res.data;
};

//update
//update product status seller의 반납완료 처리
export const updateProductHistory = async (productId: string) => {
  const res = await axiosInstance.put(
    `https://rentalmarket.monster/rental/${productId}`
  );
  return res;
};

//delete
// export const deleteProduct = async (id: string) => {
//   const res = await axiosInstance.delete(`/api/products/delete/${id}`);
//   return res;
// };
export const deleteProductHistory = async (id: string) => {
  const res = await axiosInstance.delete(
    `https://rentalmarket.monster/history/${id}`
  );
  return res;
};
