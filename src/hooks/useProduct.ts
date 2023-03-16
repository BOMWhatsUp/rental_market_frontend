import { addRentalProduct } from "../api/rentalCreate";
import { useMutation } from "react-query";

export const useProduct = () => {
  // Access the client
  //const queryClient = useQueryClient();
  type RentalProduct = {
    title: string;
    content: string;
    unitPrice: number;
    maxRentalPeriod: string;
    categoryId: string;
    wishRegion: string;
    sellerId: string;
    nickname: string;
  };
  const rentalProductMutation = useMutation({
    mutationFn: (data: RentalProduct) => addRentalProduct(data),
  });

  return {
    rentalProductMutation,
  };
};
