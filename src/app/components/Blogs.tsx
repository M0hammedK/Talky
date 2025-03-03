"use client";
import { useEffect, useState } from "react";
import { fetchBlogs, BlogPost } from "../../services/blogPosts";

interface User {
  id: number;
  name: string;
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [users, setUsers] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch blogs first
        const blogData = await fetchBlogs();
        setBlogs(blogData);

        // Get unique author IDs from blogs
        const authorIds = Array.from(
          new Set(blogData.map(blog => blog.authorId?.toString()))
        ).filter((id): id is string => !!id);

        // Fetch all users and create a name map
        const usersMap: { [key: string]: string } = {};
        
        await Promise.all(
          authorIds.map(async (id) => {
            try {
              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`);
              const user: User = await res.json();
              usersMap[id] = user.name;
            } catch (err) {
              console.error(`Failed to fetch user ${id}:`, err);
              usersMap[id] = "Unknown Author";
            }
          })
        );

        setUsers(usersMap);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


  if (error) return <p>Error: {error}</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {loading && (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
    </div>
  )}
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="max-w-[400px] bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 mx-4 my-6"
        >
          <img
            src={`https://picsum.photos/400/250?random=${blog.id}`}
            alt="Blog post thumbnail"
            className="w-full h-64 object-cover rounded-t-xl border-b border-gray-100"
          />

          <div className="p-6">
            <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
              <span className="font-semibold text-blue-600">{}</span>
              <span>{new Date(blog.createdAt).toDateString()}</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">{blog.title}</h2>

            <p className="text-gray-600 mb-5 leading-relaxed">
              {blog.content.substring(0, 100)}...
            </p>

            <div className="flex items-center gap-3">
              <img
                src="https://img.icons8.com/?size=100&id=xXjlE05o3dcg&format=png&color=000000"
                alt="Author avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium text-gray-700">

              {users[blog.authorId?.toString() || ''] || "Deleted"}
              </span>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
            <div className="flex justify-between items-center">
              <a href={`post/${blog.id}`} className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                Read Article →
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}