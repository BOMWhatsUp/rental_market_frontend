import {
  addRentalProduct,
  addRentalProductImgs,
  addRentalProductForm,
} from "../api/rentalCreate";
import { useMutation } from "react-query";
import { RentalProduct } from "../types/product";
export const useProduct = () => {
  // Access the client
  //const queryClient = useQueryClient();

  const rentalProductMutation = useMutation({
    mutationFn: (data: RentalProduct) => addRentalProduct(data),
  });
  const rentalProductFilesMutation = useMutation({
    mutationFn: (data: FormData) => addRentalProductImgs(data),
  });
  const rentalProductFormMutation = useMutation({
    mutationFn: (data: FormData) => addRentalProductForm(data),
  });
  return {
    rentalProductMutation,
    rentalProductFilesMutation,
    rentalProductFormMutation,
  };
};
