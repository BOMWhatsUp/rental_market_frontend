export interface RentalProduct {
  id: string;
  title: string;
  content: string;
  unitPrice: number;
  maxRentalPeriod: string;
  categoryName: string;
  wishRegion?: string;
  sellerId: string;
  nickname: string;
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
