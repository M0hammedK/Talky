import UserSchema from "@/models/userSchema";
import axios from "axios";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const RegisterUser = async (data: any) => {
  try {
    console.log(...data.entries())
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
    } else if (err.response?.status === 400) {
      return { error: "wrong credentials", status: 400 };
    } else if (err.response?.status === 404) {
      return { error: "User not found", status: 404 };
    }
    return { error: err.message, status: err.response?.status || 500 };
  }
};

export const GetUser = async (token: any, id: any) => {
  let response;
  await axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      response = res;
    });
  return response!.data;
};

export const GetUserById = async (authorId: string) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/${authorId}`
    );
    return res.data;
  } catch (err) {}
};

export const LogoutUser = async (token: any) => {
  console.log(token);
  const respone = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return respone.status;
};
