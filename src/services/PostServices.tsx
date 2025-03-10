import PostSchema from "@/models/postSchema";
import axios from "axios";

export const fetchBlogs = async (): Promise<PostSchema[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/post`
  );
  if (!response.data) throw new Error("Failed to fetch blogs");
  return response.data;
};

export const fetchBlog = async (id: number): Promise<PostSchema> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/post/${id}`
  );
  if (!response.data) throw new Error(`Failed to fetch blog with id: ${id}`);
  return response.data;
};

export const createPost = async (data: any, token: any) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/post/add`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.data) throw new Error(`Failed to create the post`);
  return response.data;
};
