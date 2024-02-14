import React from "react";

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
        <div>{article.title}</div>
        <div>{article.content}</div>
        <div>{article.author}</div>
      </>
    );
  } catch (error) {
    console.error(error);
    return <div>Error fetching article</div>;
  }
};

export default EditArticle;
