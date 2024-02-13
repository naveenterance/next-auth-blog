import ArticleList from "@/components/Articles";
import Link from "next/link";
import Extra from "@/components/Extra";
import Upload from "./upload/page";
import AuthorList from "@/components/Authors";

export default function Home() {
  return (
    <>
      <Link className="bg-white p-2" href={"/addArticle"}>
        Add Article
      </Link>
      <ArticleList />
      <AuthorList />
      <Extra />
      <Upload />
    </>
  );
}
