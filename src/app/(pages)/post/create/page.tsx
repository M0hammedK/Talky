'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface BlogPost {
  title: string;
  content: string;
  author:string;
  authorId:number;
}

export default function CreateBlog() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BlogPost>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: BlogPost) => {
    setLoading(true);
    try {
    const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
          'Authorization': `Bearer ${token}`, 
         },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create blog');

      reset(); 
      alert('post has been added!')
      router.push('/'); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
  <div className="max-w-2xl w-full bg-slate-50 shadow-lg rounded-xl p-8">
    <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
      Create a New Blog
    </h1>
    
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Title */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Title</label>
        <input
          {...register('title', { required: 'Title is required' })}
          className="w-full border border-gray-300 p-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter title"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      {/* Content */}
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Content</label>
        <textarea 
          {...register('content', { required: 'Content is required' })}
          className="w-full border border-gray-300 p-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={6}
          placeholder="Write your blog content..."
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Create Blog'}
      </button>
    </form>
  </div>
</div>

  );
}
