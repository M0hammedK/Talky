import CommentSchema from "@/models/commentSchema";
import axios from "axios";
import { getCookie } from "cookies-next";

export const createComment = async (postId: number, newComment: string) => {
  try {
    const token = getCookie('accessToken')
    console.log(token)
    const response = await axios.post(`/api/comment/${postId}`, newComment, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!response.data) throw new Error("Failed to create comment");

    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    return null; // Ensure function always returns something
  }
};
