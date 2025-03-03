// components/common/ProtectedRoute.tsx
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const router = useRouter();
  const accessToken = getCookie("accessToken");
  const userRole = getCookie("userRole");

  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    } else if (adminOnly && userRole !== "ADMIN") {
      router.push("/");
    }
  }, [accessToken, userRole, router]);

  return <>{children}</>;
}
