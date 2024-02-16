import UserInfo from "@/components/UserInfo";
import ArticleList from "@/components/Articles";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <UserInfo />

      <ArticleList />
    </div>
  );
}
