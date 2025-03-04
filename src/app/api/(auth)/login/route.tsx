import { NextResponse } from "next/server";
import { setCookie } from "cookies-next";

export async function POST(req: Request) {
  const data = await req.json();

  
  // Simulate setting a cookie after successful login
  const response = NextResponse.json({
    message: "User logged in successfully",
  });
  setCookie("accessToken", "your_access_token_here", {
    
  });

  return response;
}
