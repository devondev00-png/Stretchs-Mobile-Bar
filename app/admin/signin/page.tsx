"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSignIn({ searchParams }: { searchParams: { error?: string; from?: string } }) {
  const err = searchParams.error;
  const from = searchParams.from || "/admin";
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCredentials(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push(from);
      router.refresh();
    } else {
      // simpler error handling for now - just reload with error param if we want, or local state
      // but next-auth doesn't redirect on error with redirect:false
      // so we can just show error here
      setLoading(false);
      // force reload to show error from URL if we redirected, but here we didn't
      // let's manually redirect to error
      router.push(`/admin/signin?error=CredentialsSignin&from=${from}`);
    }
  }

  return (
    <section className="py-16 md:py-24 bg-zinc-950 min-h-screen flex items-center justify-center">
      <div className="container max-w-[400px]">
        <div className="card-elevated p-8 bg-white">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block no-underline">
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold text-xl shadow-sm mb-4">
                S
              </div>
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Admin Sign In</h1>
            <p className="mt-2 text-sm text-zinc-600">Enter your details to access the dashboard</p>
          </div>

          {err && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {err === "not_allowed"
                ? "This account isn't allowed to access admin."
                : "Sign in failed. Please check your details."}
            </div>
          )}

          <div className="grid gap-4">
            <button
              onClick={() => signIn("google", { callbackUrl: from })}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
                <path d="M12 4.66c1.61 0 3.1.56 4.28 1.69l3.19-3.19C17.45 1.18 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-zinc-500">Or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleCredentials} className="grid gap-3">
              <div>
                <label className="sr-only">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>
              <div>
                <label className="sr-only">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
              </div>
              <button
                disabled={loading}
                className="w-full rounded-xl bg-zinc-900 text-white px-4 py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
                type="submit"
              >
                {loading ? "Signing in..." : "Sign In with Email"}
              </button>
            </form>
          </div>

          <div className="mt-8 text-center text-xs text-zinc-500">
            <Link href="/" className="hover:text-zinc-900 hover:underline">
              ← Back to site
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
