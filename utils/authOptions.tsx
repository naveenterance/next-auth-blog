import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import { connectMongoDB } from "@/lib/mongodb";
import Authors from "@/models/user";
interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: Credentials): Promise<any> {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          const user = await Authors.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch: boolean = await bcrypt.compare(
            password,
            user.password
          );

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
};
