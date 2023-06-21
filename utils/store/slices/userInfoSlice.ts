import { PassageUserType } from "@types";
import { StateCreator } from "zustand";

export interface UserInfoSlice {
  userInfo: PassageUserType | null;
  setUserInfo: (userInfo: PassageUserType) => void;
  clearUserInfo: () => void;
}

export const createUserInfoSlice: StateCreator<UserInfoSlice> = (set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
  clearUserInfo: () => set({ userInfo: null }),
});
