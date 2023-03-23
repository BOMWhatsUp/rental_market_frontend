import { atom } from "recoil";

export const pageItemsState = atom<any>({
  key: `pageItems`,
  default: [],
});

export const currentPageState = atom({
  key: `currentPage`,
  default: 1,
});
export const hasNextState = atom({
  key: `hasNext`,
  default: true,
});

export const isInViewState = atom({
  key: `isInView`,
  default: false,
});
