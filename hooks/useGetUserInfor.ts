import { UserInfo } from "@/modules/user/types";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export const useUserInfo = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userStr = await SecureStore.getItemAsync("userInfo");
        if (userStr) setUser(JSON.parse(userStr));
      } catch (err) {
        console.error("Error reading userInfo:", err);
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
  }, []);

  const clearUser = () => setUser(null); 

  return { user, loading, setUser, clearUser };
};
