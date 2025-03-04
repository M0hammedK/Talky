import { RegisterUser } from "@/services/UserServices";
import { register } from "module";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  RegisterUser(data)
    .then((res) => {
      return NextResponse.json({ data: "User registered successfully" });
    })
    .catch((err) => {
      return NextResponse.json({ error: err.message });
    });
}
