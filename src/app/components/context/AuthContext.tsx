"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { GetUser } from "@/services/UserServices";
import UserSchema from "@/models/userSchema";
import { getCookie } from "cookies-next";

const AuthContext = createContext<{ user?: UserSchema | null }>({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSchema | undefined>();

  useEffect(() => {
    const getUser = async () => {
      const token = await getCookie("accessToken");
      if (token) {
        const res = await GetUser();
        if (res) setUser(res);
      }
    };
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
