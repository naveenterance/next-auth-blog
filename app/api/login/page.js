import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    Providers.Credentials({
      credentials: {
        name: { label: "name", type: "text" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const { name, password } = credentials;

        const user = await validateCredentials(name, password);
        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
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
