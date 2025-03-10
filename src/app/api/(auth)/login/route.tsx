import { NextResponse } from "next/server";
import { userSchema } from "@/models/userSchema";
import { ZodError } from "zod";
import { ZodErrorToString } from "@/utils/ErrorUtils";
import { LoginUser } from "@/services/UserServices";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const data = await req.json();

  // Simulate setting a cookie after successful login
  try {
    userSchema.parse({ ...data, name: "name" });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: ZodErrorToString(err) },
        { status: 400 }
      );
    }
  }

  const result = await LoginUser(data);

  if (result?.error) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status }
    );
  }

  (await cookies()).set("accessToken", result["accessToken"], {
    httpOnly: true, // Secure from client-side scripts
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict", // Protect against CSRF attacks
    path: "/", // Make it accessible to all routes
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
  return NextResponse.json({ data: result }, { status: 201 });
}
