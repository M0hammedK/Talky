import axios from "axios";

export const createComment = async (
  postId: number,
  content: string,
  token: string
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/comment/${postId}`,
      { content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.data) throw new Error("Failed to create comment");

    return response.data;
  } catch (error) {
    return null; // Ensure function always returns something
  }
};
