import { UserSchema } from "@/models/userSchema";
import { RegisterUser } from "@/services/UserServices";
import { ZodErrorToString } from "@/utils/ErrorUtils";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request) {
  const data = await req.json();
  try {
    UserSchema.parse(data);
  } catch (err: any) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: ZodErrorToString(err) },
        { status: 400 }
      );
    }
  }

  const result = await RegisterUser(data);

  if (result?.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
}
