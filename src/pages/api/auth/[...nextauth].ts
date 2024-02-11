import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { validateToken } from "@/utils/validate-token";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  theme: {
    logo: "/images/logo.svg",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const url = process.env.NEXT_PUBLIC_API_URL + "/auth/signin";

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: user,
            account: account,
            profile: profile,
            email: email,
            credentials: credentials,
          }),
        });

        const body = await response.json();
        console.log(body);
        if (account && response.ok) {
          const mergedUser = { ...user, ...body };
          account.access_token = body.accessToken;
          account.roles = body.roles;

          return mergedUser;
        }
      } catch (e) {
        console.log(e);
      }

      return false;
    },
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
        token.roles = account.roles;
      }
      token.isValid = await validateToken(token.access_token);
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.roles = token.roles;
      session.isValid = token.isValid;
      return session;
    },
  },
};

export default NextAuth(authOptions);
