import API from "../axiosInstance";
import {
  RentalProduct,
  RentalProductDetail,
  RentalProductHistory,
  AddProductForm,
} from "../../types/product";
import { useMutation } from "react-query";

//create
//TODO: 연동 확인해야함
export const addProduct = async ({ formData, accessToken }: AddProductForm) => {
  //console.log(formData, accessToken ? accessToken : "로그인해야됨");
  return await API.prod.post("/product", formData, {
    headers: {
      //TODO: mutation에 string 추가가 안되는 문제 해결해야. 안되면 토큰 없으면 그냥 페이지 자체를 막아서...
      Authorization: accessToken,
      //"X-AUTH-TOKEN": accessToken,
      "Content-Type": "multipart/form-data",
    },
  });
};

//create
export const addTransaction = async (form: {
  accessToken: string;
  productId: string;
  userId: string;
  userNickName: string;
  days: number;
  totalPrice: number;
}) => {
  const data = {
    userId: form.userId,
    userNickName: form.userNickName,
    days: form.days,
    totalPrice: form.totalPrice,
  };
  //console.log(data, form.productId);
  return await API.prod.post(`/payment/product/${form.productId}`, data, {
    headers: {
      Authorization: form.accessToken,
    },
  });
};

//read
export const getProducts = async (
  accessToken: string = "",
  categoryName: string = "",
  userRegion: string = "",
  keyword: string = "",
  status: string = "",
  page: number = 1,
  size: number = 5
) => {
  const res = await API.prod.get<RentalProduct[]>(
    //mocking
    //`/api/products?page=${page}&size=${size}&categoryName=${categoryName}&wishRegion=${userRegion}&keyword=${keyword}&status=${status}`
    //local http server
    //`http://3.37.196.93:8080/products?page=${page}&size=${size}&category-name=${categoryName}&keyword=${keyword}&userRegion=${userRegion}&status=${status}`
    //vercel https server
    `/products?page=${page}&size=${size}&category-name=${categoryName}&keyword=${keyword}&userRegion=${userRegion}&status=${status}`,
    //proxy
    //`/api/products?page=${page}&size=${size}&category-name=${categoryName}&keyword=${keyword}&userRegion=${userRegion}&status=${status}`
    {
      headers: {
        //"X-AUTH-TOKEN": accessToken,
        Authorization: accessToken,
      },
    }
  );
  return res.data;
};

export const getProduct = async (id: string, accessToken: string) => {
  const res = await API.prod.get<RentalProductDetail>(
    //mocking
    //`/api/products/detail/${id}`
    //local http server
    // `http://3.37.196.93:8080/product/${id}`
    //vercel https server
    `/product/${id}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  return res.data;
};

export const getProductHistory = async (id: string, accessToken: string) => {
  //console.log(id);
  const res = await API.prod.get<RentalProductHistory>(`/history/${id}`, {
    headers: {
      Authorization: accessToken,
    },
  });
  return res.data;
};

export const getPayProduct = async (id: string, accessToken: string) => {
  const res = await API.prod.get<RentalProductDetail>(
    //`/api/products/pay/${id}`
    `/payment/product/${id}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  return res.data;
};

export const getHistoryProducts = async (
  accessToken: string = "",
  isSeller: boolean = false,
  userId: string = "",
  page: number = 1,
  size: number = 5
) => {
  let res;
  if (isSeller) {
    res = await API.prod.get<RentalProductHistory[]>(
      //`/api/seller/history?page=${page}&size=${size}&userId=${userId}`
      `/history/${userId}/seller?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
  } else {
    res = await API.prod.get<RentalProductHistory[]>(
      //`/api/buyer/history?page=${page}&size=${size}&userId=${userId}`
      `/history/${userId}/buyer?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
  }
  //console.log(isSeller, userId, page, size);
  return res.data;
};

//update
//update product status seller의 반납완료 처리
export const updateSellerProductHistory = async (form: {
  historyId: string;
  accessToken: string;
}) => {
  //console.log(form);
  const res = await API.prod.put(
    `https://rentalmarket.monster/rental/${form.historyId}`,
    {},
    {
      headers: {
        Authorization: form.accessToken,
      },
    }
  );
  return res;
};

export const updateBuyerProductHistory = async (form: {
  historyId: string;
  trackingInfo: string;
  accessToken: string;
}) => {
  console.log(form);
  const res = await API.prod.post(
    //TODO: 주소확인 필요
    `https://rentalmarket.monster/history/buyer/${form.historyId}`,
    {
      headers: {
        Authorization: form.accessToken,
      },
    }
  );
  return res;
};

//delete
// export const deleteProduct = async (id: string) => {
//   const res = await axiosInstance.delete(`/api/products/delete/${id}`);
//   return res;
// };
export const deleteProductHistory = async (form: {
  historyId: string;
  accessToken: string;
}) => {
  const res = await API.prod.delete(`/history/${form.historyId}`, {
    headers: {
      Authorization: form.accessToken,
    },
  });
  return res;
};
