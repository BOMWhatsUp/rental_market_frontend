import API from "../axiosInstance";
import {
  RentalProduct,
  RentalProductDetail,
  RentalProductHistory,
  AddProductForm,
} from "../../types/product";
//create
//TODO: 연동 확인해야함
export const addProduct = async ({ formData, accessToken }: AddProductForm) => {
  //console.log(formData, accessToken ? accessToken : "로그인해야됨");
  return await API.prod.post("/product", formData, {
    headers: {
      //TODO: mutation에 string 추가가 안되는 문제 해결해야. 안되면 토큰 없으면 그냥 페이지 자체를 막아서...
      Authorization: accessToken,
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
    `/products?page=${page}&size=${size}&category-name=${categoryName}&keyword=${keyword}&userRegion=${userRegion}&status=${status}`,
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  return res.data;
};

export const getProduct = async (id: string, accessToken: string) => {
  const res = await API.prod.get<RentalProductDetail>(
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
  const res = await API.prod.get<RentalProductHistory>(`/history/${id}`, {
    headers: {
      Authorization: accessToken,
    },
  });
  return res.data;
};

export const getPayProduct = async (id: string, accessToken: string) => {
  const res = await API.prod.get<RentalProductDetail>(
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
      `/history/${userId}/seller?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
  } else {
    res = await API.prod.get<RentalProductHistory[]>(
      `/history/${userId}/buyer?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
  }

  return res.data;
};

//update
//update product status seller의 반납완료 처리
export const updateSellerProductHistory = async (form: {
  historyId: string;
  accessToken: string;
}) => {
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
  id: string; // historyId
  productId: string;
  message: string;
  userNickname: string;
  sellerNickname: string;
  returnYn: boolean;
  accessToken: string;
}) => {
  console.log(form);

  const res = await API.prod.post(
    `https://rentalmarket.monster/chat/return`,
    {
      id: form.id, // historyId
      productId: form.productId,
      message: form.message,
      userNickname: form.userNickname,
      sellerNickname: form.sellerNickname,
      returnYn: form.returnYn,
      accessToken: form.accessToken,
    },
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
