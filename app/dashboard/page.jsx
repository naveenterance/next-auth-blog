import UserInfo from "@/components/UserInfo";
import ArticleList from "@/components/Articles";
import Link from "next/link";
import AuthorList from "@/components/Authors";

export default function Dashboard() {
  return (
    <>
      <UserInfo />
      <Link className="bg-white p-2" href={"/addArticle"}>
        Add Article
      </Link>
      <ArticleList />
      <AuthorList />
    </>
  );
}
