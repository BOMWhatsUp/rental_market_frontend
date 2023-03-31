import { addRentalProductForm } from "../api/rentalCreate";
import { useMutation } from "react-query";
import { RentalProduct } from "../types/product";
import { useQuery } from "react-query";
import { useInfiniteQuery } from "react-query";
import { addProduct } from "../api/rentalProduct/rentalProductAPI";
export const useProduct = () => {
  // Access the client
  //const queryClient = useQueryClient();

  // const rentalProductMutation = useMutation({
  //   mutationFn: (data: RentalProduct) => addRentalProduct(data),
  // });
  // const rentalProductFilesMutation = useMutation({
  //   mutationFn: (data: FormData) => addRentalProductImgs(data),
  // });
  const rentalProductFormMutation = useMutation({
    //mutationFn: (data: FormData) => addRentalProductForm(data),
    mutationFn: (data: FormData) => addProduct(data),
  });

  return {
    rentalProductFormMutation,
  };
};
