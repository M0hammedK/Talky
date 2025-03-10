"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { GetUser } from "@/services/UserServices";
import UserSchema from "@/models/userSchema";

const AuthContext = createContext<{ user?: UserSchema | null }>({});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSchema | null>();

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        await GetUser(token, localStorage.getItem("user"))
          .then((res: any) => {
            const { createdAt, updatesAt, ...rest } = res;
            if (res) setUser(new UserSchema(rest));
          })
          .catch((err) => {
            try {
              if (err.response.status === 401)
                localStorage.removeItem("accessToken");
            } catch (err) {}
          });
      } else setUser(null);
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
