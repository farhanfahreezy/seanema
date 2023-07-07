import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import prisma from "../../../libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "notspidey" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // DECONSTRUCT CREDENTIALS
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        // CHECK : MISSING DATA
        if (!username || !password) {
          throw new Error("Please enter an username and password");
        }

        // CHECK : IS USER ALREADY IN DB
        const userDb = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (!userDb) {
          throw new Error("No username found");
        }

        // CHECK : IS PASS CORRECT
        const pwdMatch = await bcrypt.compare(password, userDb.hashedPassword);

        if (!pwdMatch) {
          throw new Error("Incorrect password");
        }
        console.log(pwdMatch);
        return userDb;
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user && user.id) {
        console.log("User JWT ", user);
        token.uid = user.id as string; // Assign user's id to token

        // Get user's role
        const userData = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });

        if (userData) {
          token.role = "USER"; // Assign role to token
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      // Get user's data
      const userData = await prisma.user.findUnique({
        where: {
          id: token.uid as string,
        },
        select: {
          name: true,
          username: true,
          birthday: true,
          balance: true,
        },
      });

      if (token?.uid && userData) {
        // Check if token exists and has uid property
        session.user = userData;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
