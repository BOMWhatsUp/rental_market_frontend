import axios from "axios";
type RentalProduct = {
  title: string;
  content: string;
  unitPrice: number;
  maxRentalPeriod: string;
  categoryId: string;
  wishRegion: string;
  sellerId: string;
};

export const getRentalProducts = async () => {
  return await axios.get("/api/product").then((response) => response.data);
};

export const addRentalProduct = async (product: RentalProduct) => {
  await axios({
    method: "post",
    url: "/api/product",
    headers: {
      "content-type": "application/json",
    },
    data: product,
  });
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`todo/${id}`);
};

export const updateTodo = async (id: number, text: string) => {
  await axios.put(`todo/${id}`, {
    text,
  });
};
