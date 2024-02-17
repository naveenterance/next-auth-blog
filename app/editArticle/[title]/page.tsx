import React, { FC } from "react";
import Edit from "@/components/Edit";
import { Article } from "@/components/getArticles";

interface FetchedData {
  article: Article;
}

interface EditArticleProps {
  params: {
    title: string;
  };
}

const getByTitle = async (title: string): Promise<Article | null> => {
  try {
    const res = await fetch(
      `https://next-auth-blog-sigma.vercel.app/api/articles/${title}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch article");
    }

    const data: FetchedData = await res.json();
    return data.article;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const EditArticle: FC<EditArticleProps> = async ({ params }) => {
  const { title } = params;

  try {
    const article = await getByTitle(title);

    if (!article) {
      return <div>Article not found</div>;
    }

    return (
      <Edit
        id={article._id}
        title={title}
        content={article.content}
        author={article.author}
      />
    );
  } catch (error) {
    console.error(error);
    return <div>Error fetching article</div>;
  }
};

export default EditArticle;
