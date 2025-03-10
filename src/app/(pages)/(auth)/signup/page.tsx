"use client";

import ErrorMessage from "@/app/components/UI/ErrorMessage";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState<string>(""); // Error state
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) router.push("/");
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    // Clear any previous error messages
    setError("");

    await axios
      .post(
        "/api/register",
        { name, email, password, passwordAgain },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        router.push("/login");
      })
      .catch((err) => {
        setError(err.response?.data?.error || "Something went wrong");
        setIsLoading(false);
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Workflow"
        />
        <h2 className="mt-4 mb-4 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Sign up new account
        </h2>
        <Link href={"/login"} className="text-center text-blue-500">
          <p>
            <u>Already have one?</u>
          </p>
        </Link>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-4 px-4 shadow sm:px-10">
          <form onSubmit={handleSubmit}>
            {/* Image */}
            <div className="mb-4 justify-self-center">
              <label htmlFor="profileImage">
                <img
                  src={"/userImg.png"}
                  alt="Profile Picture"
                  width={120}
                  height={120}
                  className="image"
                />
              </label>
            </div>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Name
              </label>
              <div className="mt-1 block rounded-md shadow-sm">
                <input
                  id="name"
                  placeholder="Mohammed Hasan"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`appearance-none text-black block w-full px-3 py-2 border ${
                    error ? "border-red-500" : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                />
              </div>
            </div>

            {/* Email */}
            <div className="mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1 block rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  placeholder="user@example.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`appearance-none text-black block w-full px-3 py-2 border ${
                    error ? "border-red-500" : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none text-black block w-full px-3 py-2 border ${
                    error ? "border-red-500" : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                />
              </div>
            </div>

            {/* Password Again */}
            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Password Again
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={passwordAgain}
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  className={`appearance-none text-black block w-full px-3 py-2 border ${
                    error ? "border-red-500" : "border-gray-300"
                  } rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                />
              </div>
            </div>

            {/* Error message */}
            <ErrorMessage error={error} />

            {/* Submit Button */}
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex disabled:bg-blue-950 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  {isLoading ? "submitting..." : "Sign Up"}
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
