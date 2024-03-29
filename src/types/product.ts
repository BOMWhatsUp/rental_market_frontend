export interface RentalProduct {
  id: string;
  title: string;
  content?: string;
  unitPrice?: number;
  maxRentalPeriod: string;
  categoryName: string;
  wishRegion?: string;
  sellerId: string;
  nickname?: string;
  mainImageUrl?: string;
  status: string;
  returnDate?: Date;
}

export interface RentalProductDetail extends RentalProduct {
  modifiedAt: Date;
  sellerProfile: string;
  sellerRegion: string;
  imageUrls: string[];
}
export interface RentalProductHistory extends RentalProduct {
  totalPrice: number;
  sellerNickName?: string;
  rentalDate: Date;
  returnDate: Date;
  returnYn: boolean;
}

export type RentalProductForm = {
  title: string;
  content: string;
  unitPrice: number;
  maxRentalPeriod: string;
  categoryName: string;
  wishRegion: string;
  sellerId: string;
  nickname: string;
};

//api
export interface AddProductForm {
  formData: FormData;
  accessToken: string;
}
