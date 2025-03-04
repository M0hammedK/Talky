"use client";

import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    const logout = async () => {
      localStorage.clear();
      const respone = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (respone.ok) {
        alert("Logged Out");
        window.location.reload();
      }
    };
    logout();
  });
  return <h1>Logging out...</h1>;
}
