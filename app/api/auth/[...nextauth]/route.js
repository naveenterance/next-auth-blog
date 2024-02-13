import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "@/db/mongodb";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        name: { label: "name", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const { name, password } = credentials;
        try {
          const db = await connectMongoDB();
          console.log(db);
          const user = await db.collection("author");
          console.log(user);

          if (!user) {
            throw new Error("No user found");
          }

          if (password !== user.password) {
            throw new Error("Invalid password");
          }

          return { name: user.name };
        } catch (error) {
          console.error("Error during authentication:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
});

export { handler as GET, handler as POST };
