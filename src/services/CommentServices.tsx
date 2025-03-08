import CommentSchema from "@/models/commentSchema";
import axios from "axios";
import { getCookie } from "cookies-next";

export const createComment = async (postId: number, content: string, token: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/comment/${postId}`, {content}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.data) throw new Error("Failed to create comment");

    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    return null; // Ensure function always returns something
  }
};