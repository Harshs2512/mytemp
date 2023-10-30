import User from "../../../models/UserModel";
import db from "../../../db/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) {
        token._id = user._id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token?._id) {
        session.user._id = token._id;
      }

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(creadentials) {
        console.log("authorize called");
        console.log("connect running...");
        await db.connect();

        console.log("findOne called");
        console.log("findOne running...");
        const user = await User.findOne({
          email: creadentials.email,
        });

        console.log("user is:-", user);

        console.log("disconnect called");
        console.log("disconnect running...");
        await db.disconnect();

        console.log("retruning...");
        if (
          user &&
          bcryptjs.compareSync(creadentials.password, user.password)
        ) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
});
