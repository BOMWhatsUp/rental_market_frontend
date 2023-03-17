import { addRentalProduct, addRentalProductImgs } from "../api/rentalCreate";
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
    thumbnailIndex: number;
  };
  const rentalProductMutation = useMutation({
    mutationFn: (data: RentalProduct) => addRentalProduct(data),
  });
  const rentalProductFilesMutation = useMutation({
    mutationFn: (data: FormData) => addRentalProductImgs(data),
  });
  return {
    rentalProductMutation,
    rentalProductFilesMutation,
  };
};
