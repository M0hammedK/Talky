import { userSchema } from "@/models/userSchema";
import { RegisterUser } from "@/services/UserServices";
import { ZodErrorToString } from "@/utils/ErrorUtils";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: any) {
  const { name, email, password, passwordAgain } = await req.json();
  try {
    if (password !== passwordAgain)
      return NextResponse.json(
        { error: "Passwords not match!" },
        { status: 400 }
      );
    userSchema.parse({ name, email, password });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: ZodErrorToString(err) },
        { status: 400 }
      );
    }
  }
  const result = await RegisterUser({ name, email, password });
  if (result?.error) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status }
    );
  }

  return NextResponse.json(
    { message: "User registered successfully" },
    { status: 201 }
  );
}
