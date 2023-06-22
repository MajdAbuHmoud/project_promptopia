import { PassageUserType } from "@types";
import { StateCreator } from "zustand";

export interface UserInfoSlice {
  userInfo: PassageUserType | null;
  getUserInfo: () => void;
  userInfoProcessed: boolean;
  clearUserInfo: () => void;
}

export const createUserInfoSlice: StateCreator<UserInfoSlice> = (set) => ({
  userInfo: null,
  userInfoProcessed: false,
  getUserInfo: async () => {
    /* if you didn't add forward slash before api, it will call the api 
      from the current page url instead of the root url of the website
      (e.g. http://localhost:3000/auth/api/auth/passageAuth instead of 
      http://localhost:3000/api/auth/passageAuth) */

    const res = await fetch("/api/auth/passageAuth");
    console.log("🚀 ~ file: userInfoSlice.ts:14 ~ setUserInfo: ~ res:", res);
    const data = await res.json();
    console.log("🚀 ~ file: layout.tsx:30 ~ RootLayout ~ data:", data);
    set({ userInfo: data, userInfoProcessed: true });
  },
  clearUserInfo: () => set({ userInfo: null, userInfoProcessed: false }),
});
