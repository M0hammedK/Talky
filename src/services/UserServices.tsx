import UserSchema from "@/models/userSchema";
import axios from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const RegisterUser = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return data on success
  } catch (err: any) {
    if (err.response?.status === 403) {
      return { error: "User already exists", status: 403 };
    }
    return { error: err.message, status: err.response?.status || 500 };
  }
};

export const LoginUser = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Return data on success
  } catch (err: any) {
    if (err.response?.status === 404) {
      return { error: "User not exist", status: 404 };
    }
    return { error: err.message, status: err.response?.status || 500 };
  }
};

// export const GetToken = async () => {
//   return (await cookies()).get("accessToken");
// };

export const GetUser = async () => {
  let response;
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    })
    .then((res) => {
      response = res;
    });
  return new UserSchema(response!.data);
};

export const GetUserById = async (authorId: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/${authorId}`
    );
    return res.data;
  } catch (err) {
  }
};
