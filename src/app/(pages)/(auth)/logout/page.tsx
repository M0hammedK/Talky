"use client";

import { LogoutUser } from "@/services/UserServices";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    const logout = async () => {
      await LogoutUser(localStorage.getItem("accessToken"))
        .then((res) => {
          if (res === 200) {
            localStorage.clear();
            router.push("/login");
            window.location.reload();
          } else {
            router.push("/");
            window.location.reload();
          }
        })
        .catch((err) => {
          router.push("/");
        });
    };
    logout();
  });
  return <h1>Logging out...</h1>;
}
