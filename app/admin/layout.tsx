import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin | Stretchs Mobile Bar",
};

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/packages", label: "Packages" },
  { href: "/admin/reorder", label: "Reorder" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="border-b border-zinc-800 bg-zinc-900">
        <div className="container h-14 flex items-center justify-between">
          <Link href="/" className="no-underline text-sm font-medium text-zinc-400 hover:text-white transition-colors">← Back to site</Link>
          <div className="text-sm text-zinc-400">{session?.user?.email}</div>
        </div>
      </div>
      <div className="container py-8 grid gap-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 h-fit">
          <div className="text-xs text-zinc-500 mb-2">Admin</div>
          <nav className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="no-underline rounded-xl px-3 py-2 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors">
                {n.label}
              </Link>
            ))}
          </nav>
          <form action="/api/auth/signout" method="post" className="mt-4">
            <button className="w-full rounded-xl border border-zinc-800 px-3 py-2 hover:bg-zinc-800 text-sm text-zinc-400 hover:text-white transition-colors" type="submit">
              Sign out
            </button>
          </form>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
