'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Use next/router
import { format } from 'date-fns';
import { jwtDecode } from 'jwt-decode';

// Define the types
interface BlogPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorId: number | null;
}

interface User {
  userId: number;
  name: string;
}

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Access dynamic route parameter 'id' using router.query
  

  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState<string>('Unknown Author'); // State for author name

  // Fetch user data
  const getUser = async (id: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const user: User = await response.json();
      setAuthorName(user.name); // Set the author name
    } catch (error) {
      console.error('Error fetching user:', error);
      setAuthorName('Unknown Author'); // Fallback value
    }
  };

  useEffect(() => {
    // Check if id is available
    if (!id) {
      console.log('ID is not available yet');
      setLoading(true); // Stay in loading state
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<User>(token); // Decode the JWT token
      setUser(decoded); // Set the user state
    }

    // Fetch the blog post by ID
    const fetchBlog = async (id: number): Promise<BlogPost> => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch blog with id: ${id}`);
      return response.json();
    };

    const loadBlog = async () => {
      try {
        const data = await fetchBlog(Number(id)); // Fetch blog data
        setBlogPost(data);

        // Fetch author name if authorId exists
        if (data.authorId) {
          getUser(data.authorId);
        }
      } catch (err) {
        setError((err as Error).message);
        router.push('/404');
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id, router]); // Trigger useEffect when id or router changes

  if (loading) return <p>Loading...</p>; // Show loading message until data is fetched
  if (error) return <p>Error: {error}</p>;
  if (!blogPost) return <p>Blog post not found</p>;

  // Format the createdAt date
  const formattedDate = blogPost.createdAt
    ? format(new Date(blogPost.createdAt), 'MMMM dd, yyyy HH:mm')
    : '';

  // Delete handler
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${blogPost.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Blog post deleted successfully!');
        router.push('/');
      } else {
        alert('Failed to delete the blog post.');
      }
    } catch (err) {
      console.error('Error deleting the post:', err);
    }
  };

  return (
    <div className="min-w-full h-screen flex flex-col justify-top items-center bg-gray-50">
      <div className="relative p-6 sm:p-8 w-full max-w-full">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <a href="#" className="text-indigo-600 hover:text-indigo-800 transition duration-300 text-sm">
              {/* Add a link text if needed */}
            </a>
            <h1 className="text-gray-900 font-bold text-3xl sm:text-4xl text-center my-4">
              {blogPost.title}
            </h1>
            <div className="py-4 text-sm text-gray-600 flex justify-center space-x-8">
              <span className="flex items-center">
                <svg
                  className="text-indigo-600"
                  fill="currentColor"
                  height="16px"
                  width="16px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                </svg>
                <span className="ml-2">{format(new Date(blogPost.createdAt), 'MMMM do, yyyy')}</span>
              </span>

              <span className="flex items-center">
                <svg
                  className="text-indigo-600"
                  fill="currentColor"
                  height="16px"
                  aria-hidden="true"
                  role="img"
                  focusable="false"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  ></path>
                </svg>
                <span className="ml-2">{authorName}</span>
              </span>
            </div>
            <hr className="my-4 border-t-2 border-gray-200" />
            <p className="text-base leading-8 my-5 text-gray-800">{blogPost.content}</p>
          </div>

          {user && blogPost.authorId === user.userId && (
            <div className="px-6 py-4 flex justify-end">
              <button
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-700 transition duration-300 py-2 px-6 rounded-lg shadow-md focus:outline-none"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
