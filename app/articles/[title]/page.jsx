import React from "react";
import Image from "next/image";
import moment from "moment";

const getByTitle = async (title) => {
  try {
    const res = await fetch(`http://localhost:3000/api/articles/${title}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch article: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();

    return data.article;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const EditArticle = async ({ params }) => {
  const { title } = params;

  try {
    const article = await getByTitle(title);

    if (!article) {
      return <div>Article not found</div>;
    }

    return (
      <>
        <div className="w-screen ">
          <div
            style={{
              backgroundImage: `url('/${article.title}.jpg'), url('/${article.title}.jpeg'), url('/${article.title}.png')`,
              scale: "75%",
            }}
            className="bg-scroll bg-no-repeat bg-cover bg-center flex justify-end h-screen relative"
          >
            <div className="absolute inset-0 bg-black opacity-30" />
            <div className="absolute inset-0 flex justify-end items-center">
              <div className="mx-6 text-5xl text-white  font-bold ">
                {article.title}
              </div>
            </div>
          </div>
          <div className="absolute  right-24  text-xl font-extrabold opacity-60 ">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-24 h-24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <div className="flex flex-col">
                <p className="m-4">{article.author}</p>{" "}
                <p className=" font-bold text-md  opacity-65">
                  {moment(article.createdAt).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-36 w-5/6 mx-auto text-md">{article.content}</div>
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
    return <div>Error fetching article</div>;
  }
};

export default EditArticle;
