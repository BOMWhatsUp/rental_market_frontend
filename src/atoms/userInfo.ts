import { atom } from "recoil";

export const userInfo = atom({
  key: "userInfo",
  default: {
    userEmail: "",
    userNickName: "",
    userRegion: "",
    userProfileImage: "",
  },
});
