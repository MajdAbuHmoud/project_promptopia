import { create } from "zustand";
import { UserInfoSlice, createUserInfoSlice } from "./slices/userInfoSlice";

export const useStore = create<UserInfoSlice>()((...a) => ({
  ...createUserInfoSlice(...a),
}));
