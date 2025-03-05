import axios from "axios";

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
