import axios from "axios";
import { RentalProduct } from "../types/product";

export const getRentalProducts = async () => {
  return await axios.get("/api/product").then((response) => response.data);
};

export const addRentalProduct = async (product: RentalProduct) => {
  return await axios({
    method: "post",
    url: "/api/product",
    headers: {
      "content-type": "application/json",
    },
    data: product,
  }).then((response) => response.data);
};
export const addRentalProductImgs = async (formData: FormData) => {
  return await axios({
    method: "post",
    url: "/api/product/files",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  }).then((response) => response.data);
};
export const addRentalProductForm = async (formData: FormData) => {
  return await axios({
    method: "post",
    url: "/api/product2",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  }).then((response) => response.data);
};
export const deleteTodo = async (id: number) => {
  await axios.delete(`todo/${id}`);
};

export const updateTodo = async (id: number, text: string) => {
  await axios.put(`todo/${id}`, {
    text,
  });
};
