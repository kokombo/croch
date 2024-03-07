import axios from "axios";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { api_base_url } from "../../../testing";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        return await axios
          .post(`${api_base_url}/auth/signin`, { email, password })
          .then((res) => {
            const user: User = res.data;

            if (user) {
              return user;
            } else {
              return null;
            }
          })
          .catch((error) => {
            throw new Error(error?.response?.data?.message);
          });
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, //2hrs
  },

  callbacks: {
    async jwt({ token, user, trigger, account }) {
      if (account) {
        if (trigger === "signIn") {
          token.id = user.id;
          token.role = user.role;
          token.accessToken = user.accessToken;
          token.accountDisabled = user.accountDisabled;
          token.email = user.email;
          token.emailVerified = user.emailVerified as boolean;
          token.firstName = user.firstName;
          token.lastName = user.lastName;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      session.user.accountDisabled = token.accountDisabled;
      session.user.email = token.email;
      session.user.emailVerified = token.emailVerified;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;

      return session;
    },
  },

  pages: {
    signIn: "",
  },
};
