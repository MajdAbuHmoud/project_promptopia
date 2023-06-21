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
    const res = await fetch("api/auth/passageAuth");
    console.log("🚀 ~ file: userInfoSlice.ts:14 ~ setUserInfo: ~ res:", res);
    const data = await res.json();
    console.log("🚀 ~ file: layout.tsx:30 ~ RootLayout ~ data:", data);
    set({ userInfo: data, userInfoProcessed: true });
  },
  clearUserInfo: () => set({ userInfo: null, userInfoProcessed: false }),
});
