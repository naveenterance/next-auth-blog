"use client";

import React, { useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const UploadForm = () => {
  const [file, setFile] = useState<File>();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  // const [author, setAuthor] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !content || !file) {
      alert("Title, content, and image are required.");
      return;
    }
    const test = await fetch(`http://localhost:3000/api/articles/${title}`);
    console.log(session);
    const author = session?.user?.name;
    console.log(session?.user?.name);
    if (test.ok) {
      alert("Make title more unique.");
      return;
    }
    try {
      const resForm = await fetch("http://localhost:3000/api/articles", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, content, author }),
      });

      // Get the file extension
      const fileExtension = file.name.split(".").pop();
      // Create a new File object with the title and preserved extension
      const fileWithTitle = new File([file], `${title}.${fileExtension}`, {
        type: file.type,
      });

      const data = new FormData();
      data.append("file", fileWithTitle);

      const resImage = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (resForm.ok && resImage.ok) {
        router.push("home");
      } else {
        throw new Error("Failed to create an Article");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={(e) => {
          if (e.target.value.length <= 100) {
            setTitle(e.target.value);
          }
        }}
        value={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Article Title"
      />

      <textarea
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className="border border-slate-500 px-8 py-2"
        placeholder="Article content"
        style={{ whiteSpace: "pre-wrap" }}
      />

      {/* <input
        onChange={(e) => setAuthor(e.target.value)}
        value={author}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Article author"
      /> */}
      <input
        type="file"
        name="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0])}
      />

      <button
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Add Article
      </button>
    </form>
  );
};

export default UploadForm;
