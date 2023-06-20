import { PassageUserType } from "@types";
import { emptyUser } from "@utils/defaultData/defaultData";
import { useCallback, useEffect, useState } from "react";

export type UserProfileInfoType = {
  userInfo: PassageUserType;
  processed: boolean;
  clearUserInfo: () => void;
};

export function useUserProfileInfo(): UserProfileInfoType {
  const [userInfo, setUserInfo] = useState<PassageUserType>(emptyUser);
  const [processed, setProcessed] = useState(false);

  const getUserProfileInfo = useCallback(async () => {
    const getUserProfileInfoResponse = await fetch("/api/auth/passageAuth");
    const data = await getUserProfileInfoResponse.json();
    setUserInfo(data);
    setProcessed(true);
  }, []);

  const clearUserInfo = () => {
    setUserInfo(emptyUser);
  };

  useEffect(() => {
    getUserProfileInfo();
  }, [getUserProfileInfo]);

  return { userInfo, processed, clearUserInfo };
}
