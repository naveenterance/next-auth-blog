"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import "animate.css";

export default function UserInfo() {
  const { data: session } = useSession();
  const [view, setView] = useState<boolean>(false);

  return (
    <div className="fixed top-2 left-4  z-50">
      <div
        className=" w-full bg-gray-600  p-1  flex text-white   px-4 py-2 transition-colors duration-[400ms] hover:text-teal-500"
        onClick={() => setView((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12    rounded-full  hover:text-teal-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <div className="mx-4">
          <p className=" font-bold ">{session?.user?.name}</p>
          <p className="font-bold opacity-60 ">{session?.user?.email}</p>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 gap-4 w-48 bg-gray-600 text-white p-4 mt-2 z-50  animate__animated ${
          !view ? "animate__slideOutLeft" : "animate__slideInLeft"
        }`}
      >
        <div className=" flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-16 bg-gray-600 text-white  rounded-full mx-auto hover:text-red-500 transition-colors duration-[400ms]"
            onClick={() => setView((prev) => !prev)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        <div className="mx-auto">
          <Link
            href={"/addArticle"}
            className="  font-bold   px-4 py-2  text-slate-100 transition-colors duration-[400ms] hover:text-teal-500"
          >
            Add Article
          </Link>
        </div>
        <div className="mb-4 mx-auto">
          <button
            onClick={() => signOut()}
            className=" font-bold  px-4 py-2  text-slate-100 transition-colors duration-[400ms] hover:text-red-500"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
