import axios from "axios";

export const RegisterUser = async (data: any) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
