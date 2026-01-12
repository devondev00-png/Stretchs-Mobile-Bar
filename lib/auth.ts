import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

function allowEmail(email?: string | null) {
  if (!email) return false;
  const allow = (process.env.ADMIN_ALLOWLIST_EMAILS || "").split(",").map(s => s.trim().toLowerCase()).filter(Boolean);

  // FAIL SAFE: If no allowlist is set in production, deny all access.
  if (allow.length === 0) {
    console.warn("ADMIN_ALLOWLIST_EMAILS is not set. Admin access is disabled.");
    return false;
  }

  return allow.includes(email.toLowerCase());
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      // If these are missing, NextAuth will throw at runtime; keep them in env.
    }),
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password || "";

        const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
        const passwordHash = process.env.ADMIN_PASSWORD_HASH || "";

        if (!email || !password || !adminEmail || !passwordHash) return null;
        if (email !== adminEmail) return null;

        const ok = await bcrypt.compare(password, passwordHash);
        if (!ok) return null;

        if (!allowEmail(email)) return null;

        return { id: "admin", email };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Gate Google sign-ins by allowlist if provided
      if (account?.provider === "google") {
        return allowEmail(user.email);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) token.email = user.email;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.email = token.email as string;
      return session;
    },
  },
};
