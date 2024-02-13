"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddArticle() {
  const [name, setname] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !password) {
      alert("name, password, and author are required.");
      return;
    }
    // const test = await fetch(`http://localhost:3000/api/articles/${name}`);

    // if (test.ok) {
    //   alert("Make name more unique.");
    //   return;
    // }

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to create an Article");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setname(e.target.value)}
        value={name}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Article name"
      />

      <input
        onChange={(e) => setpassword(e.target.value)}
        value={password}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Article password"
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add author
      </button>
    </form>
  );
}
