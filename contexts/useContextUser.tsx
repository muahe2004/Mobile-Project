// contexts/UserContext.tsx
import { UserInfo } from "@/modules/user/types";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";

// export type UserInfo = {
//   id: string;
//   name: string;
//   role: string;
// };

type UserContextType = {
  user: UserInfo | null;
  loading: boolean;
  setUser: (user: UserInfo | null) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  clearUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userStr = await SecureStore.getItemAsync("userInfo");
        if (userStr) setUser(JSON.parse(userStr));
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const clearUser = async () => {
    await SecureStore.deleteItemAsync("userInfo");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);