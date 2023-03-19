import { atom } from "recoil";

export const token = atom({
  key: "accessToken",
  default: "",
});
