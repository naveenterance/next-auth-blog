"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import Svgs from "./Svgs";

interface EditProps {
  id: string;
  title: string;
  content: string;
  author: string;
}

const Edit: FC<EditProps> = ({ id, title, content, author }) => {
  const [newContent, setNewContent] = useState<string>(content);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);

    try {
      const res = await fetch(`/api/articles/${title}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ newContent: newContent }),
      });

      if (!res.ok) {
        throw new Error("Failed to update article");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <textarea
        onChange={(e) => setNewContent(e.target.value)}
        value={newContent}
        className="block p-2.5 text-sm text-gray-900 bg-gray-50 mx-auto rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-5/6 h-screen m-12"
      />
      {!loading ? (
        <button className="mx-auto flex font-bold text-gray-900 py-3 px-6 w-fit text-xl hover:text-teal-600 transition-colors duration-[400ms]">
          <Svgs
            className="w-12 h-12"
            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
          />
          Update Content
        </button>
      ) : (
        <div className="loader-button"></div>
      )}
    </form>
  );
};

export default Edit;
