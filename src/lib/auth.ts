import { NextAuthOptions } from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDb from "./db";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {
  providers: [
    //login kese karna hai credentials
    credentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "devil626@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      authorize: async (credentials, req) => {
        let email = credentials?.email;
        let password = credentials?.password;
        if (!email || !password) {
          throw new Error("email and password is not found");
        }
        await connectDb();
        let user = await User.findOne({ email });
        if (!user) {
          throw new Error("user not found");
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("password is incorrect");
        }
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),

    //login kese karna hai google se
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    //token ke andar user ki information store
    async signIn({ account, user }) {
      if (account?.provider == "google") {
        await connectDb();
        let existUser = await User.findOne({ email: user?.email });
        if (!existUser) {
          let existUser = await User.create({
            name: user.name,
            email: user?.email,
          });
        }
        user.id = existUser._id.toString();
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    //session ke andar token ki information store
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
