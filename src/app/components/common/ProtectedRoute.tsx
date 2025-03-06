"use client";

import { useEffect, cloneElement, ReactElement } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { GetToken } from "@/services/UserServices";

interface ProtectedRouteProps {
  children: ReactElement;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const router = useRouter();
  const accessToken = GetToken()

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, adminOnly, router]);

  return <>{cloneElement(children, { accessToken } as any)}</>;
}
