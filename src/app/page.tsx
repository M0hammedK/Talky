"use client";
import React, { useEffect, useState } from "react";
import Blogs from "./components/Blogs";
import * as jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Home from "./(pages)/Home/page";

export default function Page() {
  return (
    // <ProtectedRoute>
      <Home />
    // </ProtectedRoute>
  );
}
