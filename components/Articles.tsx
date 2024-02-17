"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Remove from "./Remove";
import { useSession } from "next-auth/react";
import LoadingArticles from "@/components/Loading";
import moment from "moment";
import Svgs from "./Svgs";
import { getArticles } from "./getArticles";
import { Article } from "./getArticles";

const ArticleList: React.FC = () => {
  const { data: session } = useSession();
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
    return <LoadingArticles />;
  }

  return (
    <>
      <div className="lg:grid lg:grid-cols-5 w-screen gap-8">
        {articles
          .sort(
            (a: Article, b: Article) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .filter((item, index) => index == 0)
          .map((item, index) => (
            <div
              style={{
                backgroundImage: `url('/${item.title}.jpg'), url('/${item.title}.jpeg'), url('/${item.title}.png')`,
              }}
              className="lg:col-span-3  mt-24 lg:mx-4 lg:h-full h-screen  bg-scroll bg-no-repeat bg-cover bg-center flex justify-end"
            >
              <div className="bg-gray-300 lg:w-1/2 w-3/4 mx-4 p-4 opacity-95  h-fit">
                <div className=" ">
                  <p className="font-extrabold text-xl ">{item.title} </p>
                  <p className=" font-bold text-md  opacity-65">
                    {moment(item.createdAt).format("DD-MM-YYYY")}
                  </p>
                </div>

                <div className="flex gap-1">
                  <Link href={`/articles/${item.title}`}>
                    <Svgs
                      className="w-8 h-8  hover:text-teal-500 transition-colors duration-[400ms]"
                      d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </Link>
                  {item.author === session?.user?.name && (
                    <>
                      <Remove id={item._id} />
                      <Link href={`/editArticle/${item.title}`}>
                        {" "}
                        <Svgs
                          className="w-8 h-8  text-teal-600 hover:text-teal-400 transition-colors duration-[400ms]"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        <div className="lg:col-span-2  h-1/4 lg:w-3/4 w-5/6 flex-col ">
          {articles
            .sort(
              (a: Article, b: Article) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .filter((item, index) => index != 0 && index <= 3)
            .map((item, index) => (
              <div
                style={{
                  backgroundImage: `url('/${item.title}.jpg'), url('/${item.title}.jpeg'), url('/${item.title}.png')`,
                }}
                className="mx-4  mt-6 bg-scroll bg-no-repeat bg-cover bg-center w-full h-48 "
              >
                <div className="bg-gray-300 w-1/2 h-fit mx-2 p-4 opacity-90">
                  <p className="font-bold lg:text-lg  ">
                    {item.title.length > 50
                      ? `${item.title.substring(0, 50)}...`
                      : item.title}
                  </p>

                  <div className="flex gap-2">
                    <Link href={`/articles/${item.title}`}>
                      {" "}
                      <Svgs
                        className="w-8 h-8  hover:text-teal-600  transition-colors duration-[400ms]"
                        d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </Link>
                    {item.author === session?.user?.name && (
                      <>
                        {" "}
                        <Remove id={item._id} />
                        <Link href={`/editArticle/${item.title}`}>
                          <Svgs
                            className="w-8 h-8 text-teal-600 hover:text-teal-400 transition-colors duration-[400ms]"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="  h-1/4 w-screen lg:grid lg:grid-cols-4 lg:gap-4">
          {articles
            .sort(
              (a: Article, b: Article) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .filter((item, index) => index > 3)
            .map((item, index) => (
              <div
                style={{
                  backgroundImage: `url('/${item.title}.jpg'), url('/${item.title}.jpeg'), url('/${item.title}.png')`,
                }}
                className="mx-4  mt-6 bg-scroll bg-no-repeat bg-cover bg-center w-5/6 lg:w-full h-48  "
              >
                <div className="bg-gray-300 w-1/2 mx-2 p-4 opacity-90">
                  <p className="font-bold text-md">
                    {" "}
                    {item.title.length > 50
                      ? `${item.title.substring(0, 50)}...`
                      : item.title}
                  </p>

                  <div className="flex gap-2">
                    <Link href={`/articles/${item.title}`}>
                      {" "}
                      <Svgs
                        className="w-8 h-8  hover:text-teal-600 transition-colors duration-[400ms]"
                        d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </Link>
                    {item.author === session?.user?.name && (
                      <>
                        {" "}
                        <Remove id={item._id} />
                        <Link href={`/editArticle/${item.title}`}>
                          <Svgs
                            className="w-8 h-8 text-teal-600 hover:text-teal-400"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ArticleList;
