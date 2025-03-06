import { userSchema } from "@/models/userSchema";
import { RegisterUser } from "@/services/UserServices";
import { ZodErrorToString } from "@/utils/ErrorUtils";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: any) {
  const formData = await req.formData();
  let img = formData["profileImage"];
  const user = JSON.parse(formData["user"]);
  try {
    userSchema.parse(user);
    if (img === null) img = await (await fetch("/userImg.png")).blob();
  } catch (err: any) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: ZodErrorToString(err) },
        { status: 400 }
      );
    }
  }
  const checkedFormData = new FormData();
  checkedFormData.append("profileImage", img);
  checkedFormData.append("user", user);
  const result = await RegisterUser(checkedFormData);
  console.log(result);
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
