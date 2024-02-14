"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Remove from "./Remove";

interface Article {
  _id: string;
  title: string;
  content: string;
  author: string;
}

const getArticles = async (): Promise<{ articles: Article[] }> => {
  try {
    const res = await fetch("http://localhost:3000/api/articles", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch articles");
    }

    return res.json();
  } catch (error) {
    console.error("Error loading articles: ", error);
    throw error;
  }
};

const ArticleList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchArticles = async () => {
    try {
      const { articles } = await getArticles();
      setArticles(articles);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {articles.map((item) => (
        <Link href={`/articles/${item.title}`}>
          <div
            key={item._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{item.title}</h2>
              <div>{item.content}</div>
              <div>{item.author}</div>
            </div>

            <div className="flex gap-2">
              <Remove id={item._id} />
              <Link href={`/editArticle/${item.title}`}>edit</Link>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ArticleList;
