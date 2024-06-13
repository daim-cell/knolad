import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import openDB from '../../../utils/database';
import { NextResponse } from "next/server";

interface Session {
  id: string; // Define id property
  user: {
    email: string | null | undefined;
  };
}

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/routes/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          console.error("No credentials provided");
          return null;
        }

        const db = await openDB();
        console.log("credentials", credentials);

        try {
          const response:any = await db.get(`SELECT * FROM users WHERE username = ?`, [credentials.email]);
          const user = response;
          console.log("user", user);

          if (user) {
            const passwordCorrect = await compare(credentials.password, user.password);

            if (passwordCorrect) {
              return {
                id: user.id,
                email: user.username,
                category : user.category
              };
            } else {
              console.error("Password is incorrect");
            }
          } else {
            console.error("No user found");
          }
        } catch (error) {
          console.error("Database error:", error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if(user){
        token.user = user
      }
      
      return token;
    },
    async session({ session, token }) {
      // Add token data to the session
      if (token) {
        session.user = token
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
