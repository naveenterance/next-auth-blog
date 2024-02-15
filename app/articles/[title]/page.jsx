import React from "react";
import Image from "next/image";

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

          <div className="mt-12 w-5/6 mx-auto text-md">{article.content}</div>
          <div className="absolute  right-24  text-3xl font-extrabold opacity-60 ">
            {" "}
            <p className="mb-24"> {article.author}</p>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
    return <div>Error fetching article</div>;
  }
};

export default EditArticle;
