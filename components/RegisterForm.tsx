"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "animate.css";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/home");
      } else {
        setError("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
      setError("Error during registration. Please try again later.");
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-[url('../public/wavess.svg')] bg-fixed bg-no-repeat bg-cover bg-center">
        <div className="lg:w-1/4 m-4 p-12 bg-gray-300 ">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative z-0 mb-5 group">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:border-teal-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-xl text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Name
              </label>
            </div>
            <div className="relative z-0 mb-5 group">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:border-teal-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-xl text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email
              </label>
            </div>
            <div className="relative z-0 mb-5 group">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:border-teal-500 focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-xl text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Password
              </label>
            </div>
            <button
              type="submit"
              className="text-md mt-3 px-6 py-2 font-bold text-gray-600 flex hover:text-teal-600  transition-colors duration-[400ms]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
              <p>Register</p>
            </button>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 animate__animated animate__slideInDown">
                {error}
              </div>
            )}
          </form>
          <div className="text-md mt-3 px-6 py-2">
            Already have an account?{" "}
            <Link href="/login">
              <div className="text-gray-600 font-bold flex hover:text-teal-600  transition-colors duration-[400ms]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                  />
                </svg>
                <p className="my-auto">Login</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
