import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ArticleList from "@/components/Articles";
import Link from "next/link";

export default async function App() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/home");

  return (
    <>
      <div className="fixed top-2 left-4  z-50">
        <div className=" w-full bg-gray-600  p-1  flex text-white   px-4 py-2 ">
          <div className="mx-4 flex">
            <p className=" font-bold transition-colors duration-[400ms] hover:text-teal-500 mr-12">
              <Link href={`/login`} className="flex mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                  />
                </svg>
                Login
              </Link>
            </p>
            <p className="font-bold  transition-colors duration-[400ms] hover:text-teal-500">
              <Link href={`/register`} className="flex mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>

      <ArticleList />
    </>
  );
}
