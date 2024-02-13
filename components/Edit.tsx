"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";

interface EditProps {
  id: string;
  title: string;
  content: string;
  author: string;
}

const Edit: FC<EditProps> = ({ id, title, content, author }) => {
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newContent, setNewContent] = useState<string>(content);
  const [newAuthor, setNewAuthor] = useState<string>(author);

  console.log(title);
  console.log(content);
  console.log(author);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/articles/${title}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle, newContent, newAuthor }),
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
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="border border-slate-500 px-8 py-2"
        type="text"
      />

      <input
        onChange={(e) => setNewContent(e.target.value)}
        value={newContent}
        className="border border-slate-500 px-8 py-2"
        type="text"
      />
      <input
        onChange={(e) => setNewAuthor(e.target.value)}
        value={newAuthor}
        className="border border-slate-500 px-8 py-2"
        type="text"
      />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  );
};

export default Edit;