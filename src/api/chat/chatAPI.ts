import API from "../axiosInstance";
import {
  RentalProduct,
  RentalProductDetail,
  RentalProductHistory,
  AddProductForm,
} from "../../types/product";
import { useMutation } from "react-query";

interface moveChatRoomForm {
  receiverNickname: string;
  senderNickname: string;
  product: RentalProduct;
}
//move chat
export const moveToChatroom = async (form: {
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
  return await API.prod.post(`/payment/product/${form.productId}`, data);
};
