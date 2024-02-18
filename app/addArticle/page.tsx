"use client";

import React, { useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

const UploadForm = () => {
  const [file, setFile] = useState<File>();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const { data: session } = useSession();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);

    if (!title || !content || !file) {
      alert("Title, content, and image are required.");
      return;
    }
    const test = await fetch(`http://localhost:3000//api/articles/${title}`);

    const author = session?.user?.name;
    if (test.ok) {
      alert("Make title more unique.");
      return;
    }
    try {
      const resForm = await fetch(`http://localhost:3000//api/articles`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, content, author }),
      });

      const fileExtension = file.name.split(".").pop();

      const fileWithTitle = new File([file], `${title}.${fileExtension}`, {
        type: file.type,
      });

      const data = new FormData();
      data.append("file", fileWithTitle);

      const resImage = await fetch(`http://localhost:3000//api/upload`, {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImagePreview(imageUrl);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 w-screen ">
      <div className="lg:w-5/6 lg:mx-auto ">
        <textarea
          onChange={(e) => {
            if (e.target.value.length <= 100) {
              setTitle(e.target.value);
            }
          }}
          value={title}
          className="block py-2.5 px-0 lg:w-1/2 w-5/6 mx-auto  text-xl text-gray-900 bg-transparent border-0 border-b-2 appearance-none  border-gray-600 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
          placeholder="Title"
        />

        <p className="text-md font-bold opacity-50 m-4">
          100 max characters for title
        </p>
        <div className="w-5/6 bg-gray-200 rounded-full  my-4 mx-auto">
          <div
            className="bg-gray-600 text-xs font-medium text-blue-100 text-center py-1 px-3.5 leading-none rounded-full"
            style={{ width: `${title.length}%` }}
          >
            {title.length}
          </div>
        </div>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className="block p-2.5 text-md text-gray-900 bg-gray-50 mx-auto  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 w-5/6 lg:w-full  h-screen my-12"
          placeholder="Article content"
          style={{ whiteSpace: "pre-wrap" }}
        />

        <div className="w-5/6 mx-auto ">
          <label className="block mb-2 text-sm font-medium text-gray-900  ">
            Upload Image
          </label>
          <input
            className="block w-full  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <p className="mt-1 text-sm text-gray-500 d" id="file_input_help">
            Image should be PNG or JPG format
          </p>
        </div>

        {imagePreview && (
          <div className="border-4 border-gray-600 w-1/3 p-4 mx-auto my-4 rounded-lg border-dashed">
            <Image
              src={imagePreview}
              alt="Preview"
              className=" "
              width={500}
              height={500}
              object-fit="cover"
            />
          </div>
        )}

        {!loading ? (
          <button
            type="submit"
            className=" font-bold text-gray-900 py-3 px-6 mx-8 flex hover:text-teal-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-12 h-12 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="my-auto"> Add Article</p>
          </button>
        ) : (
          <div className="loader-button"></div>
        )}
      </div>
    </form>
  );
};

export default UploadForm;
