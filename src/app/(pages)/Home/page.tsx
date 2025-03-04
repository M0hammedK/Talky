"use client";

import React, { useEffect, useState } from "react";
import Blogs from "../../components/Blogs";
import * as jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function Home() {
  interface User {
    userId: number;
    name: String;
    email: String;
  }
  const [loading, setLoading] = useState(false); // Loading state
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          setLoading(true);

          const decoded: User = jwtDecode(token);
          console.log(decoded.userId);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/` + decoded.userId
          );

          const data = await response.json();

          setUser(data);
          setLoading(false);
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
    };
    getData();
  }, []);

  return (
    <div className="flex bg-gray-300 justify-center">
      {/* Main Content */}
      <Blogs />
      {/* Your main content goes here */}
    </div>
  );
}
