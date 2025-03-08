// "use client";

// import { useEffect, cloneElement, ReactElement } from "react";
// import { useRouter } from "next/navigation";

// interface ProtectedRouteProps {
//   children: ReactElement;
//   adminOnly?: boolean;
// }

// export default function ProtectedRoute({
//   children,
//   adminOnly = false,
// }: ProtectedRouteProps) {
//   const router = useRouter();
//   const accessToken = localStorage.getItem("accessToken");

//   useEffect(() => {
//     if (!accessToken) {
//       router.push("/login");
//     }
//   }, [accessToken, adminOnly, router]);

//   return <>{children}</>;
// }
