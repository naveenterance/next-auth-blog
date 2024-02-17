import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { authOptions } from "@/utils/authOptions";

export default async function App() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/home");

  return (
    <main>
      <LoginForm />
    </main>
  );
}
