import { userSchema } from "@/models/userSchema";
import { RegisterUser } from "@/services/UserServices";
import { ZodErrorToString } from "@/utils/ErrorUtils";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: any) {
  const formData = await req.formData();
  let img = formData.get("file");
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordAgain = formData.get("passwordAgain");
  try {
    if (img === null) img = await (await fetch("/userImg.png")).blob();
    userSchema.parse({ name, email, password, profileImg: "jh" });
  } catch (err: any) {
    console.log(err);
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: ZodErrorToString(err) },
        { status: 400 }
      );
    }
  }
  const checkedFormData = new FormData();
  checkedFormData.append("file", img);
  checkedFormData.append("name", name);
  checkedFormData.append("email", email);
  checkedFormData.append("password", password);
  const result = await RegisterUser(checkedFormData);
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
