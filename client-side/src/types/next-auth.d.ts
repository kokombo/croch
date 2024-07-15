import type { DefaultSession, User } from "next-auth";
import NextAuth from "next-auth/next";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      accessToken?: string;
      role?: string;
      emailVerified?: boolean;
      firstName?: string;
      lastName?: string;
      accountDisabled?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    role?: string;
    id?: string;
    accessToken?: string;
    firstName?: string;
    lastName?: string;
    accountDisabled?: boolean;
    emailVerified?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    role?: string;
    emailVerified?: boolean;
    firstName?: string;
    lastName?: string;
    accountDisabled?: boolean;
  }
}
