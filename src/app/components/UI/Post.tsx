"use client";

import { useEffect, useState } from "react";
import { fetchBlogs, createPost } from "@/services/PostServices";
import PostSchema from "@/models/postSchema";
import Comments from "./Comments";
import { useAuth } from "../context/AuthContext";

export default function Blogs() {
  const [blogs, setBlogs] = useState<PostSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("/placeHolder.webp");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const { user } = useAuth();
  useEffect(() => {
    const loadData = async () => {
      try {
        const blogData = await fetchBlogs();
        setBlogs(blogData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Handle image preview
  useEffect(() => {
    if (profileImage) {
      const imageUrl = URL.createObjectURL(profileImage);
      setPreviewImage(imageUrl);

      return () => URL.revokeObjectURL(imageUrl); // Clean up memory
    }
  }, [profileImage]);

  const handleCreatePost = async () => {
    if (!newPost.content.trim() || !profileImage) {
      alert("Content and image are required!");
      return;
    }
    const formData = new FormData();
    formData.append("user", (user?.id!).toString());
    formData.append("content", newPost.content);
    formData.append("file", profileImage);
    console.log("Sending FormData:", [...formData.entries()]); // Debugging
    try {
      const createdPost = await createPost(
        formData,
        localStorage.getItem("accessToken")
      );
      setBlogs([createdPost, ...blogs]); // Prepend new post
      setIsModalOpen(false);
      setNewPost({ title: "", content: "" });
      setProfileImage(null);
      setPreviewImage("/placeHolder.webp");
    } catch (err) {
      alert("Error creating post");
    }
  };

  if (error)
    return (
      <p className="h-screen flex items-center justify-center text-rose-600 text-xl">
        Error: {error}
      </p>
    );

  return (
    <section className="flex flex-col gap-6 p-4">
      {loading && (
        <div className="flex h-full items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mx-4 my-6"
        >
          <img
            src={blog.imagePath || '/placeHolder.webo'}
            alt="Blog post thumbnail"
            className="w-full h-64 object-cover rounded-t-xl border-b border-gray-100"
          />
          <div className="p-6">
            <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
              <span className="font-semibold text-blue-600">
                {blog.author?.name}
              </span>
              <span className="text-xs">
                {new Date(blog.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-600 mb-5 leading-relaxed">{blog.content}</p>
            <div className="flex items-center gap-3">
              <img
                src={blog.author?.profileImg || '/userImg.png'}
                alt="Author avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium text-gray-700">
                {blog.author?.name}
              </span>
            </div>
          </div>
          <Comments postId={Number(blog.id)} allComments={blog.comments || []} />
        </div>
      ))}

      <div hidden={!user ? true : false}>
        {/* Floating Action Button (FAB) */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-900 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          ➕
        </button>

        {/* Modal for Creating Post */}
        {isModalOpen && (
          <div className="fixed inset-0 max-h-[100%] flex items-center justify-center">
            <div
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="w-full h-full flex bg-black bg-opacity-50"
            ></div>
            <div className="absolute max-h-[100%] bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg text-gray-600 font-bold mb-4">
                Create New Post
              </h2>

              {/* Image Upload */}
              <div className="w-full mb-4">
                <label htmlFor="profileImage" className="cursor-pointer">
                  <img
                    src={previewImage}
                    alt="Selected Image"
                    className="w-full max-w-[90vw] max-h-[90vw] object-cover rounded-lg border"
                  />
                </label>
                <input
                  id="profileImage"
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={(e) =>
                    setProfileImage(e.target.files ? e.target.files[0] : null)
                  }
                />
              </div>

              <textarea
                placeholder="Write something..."
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                className="w-full h-24 p-2 border text-gray-900 rounded mb-2"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setProfileImage(null);
                    setPreviewImage("/placeHolder.webp");
                    setNewPost({ title: "", content: "" });
                  }}
                  className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
