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
    <div className="min-h-screen bg-[#050505] text-zinc-100 italic-headings">
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="relative w-8 h-8 group no-underline">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain rounded-full border border-amber-600/30 group-hover:border-amber-500 transition-colors" />
            </Link>
            <Link href="/" className="no-underline text-sm font-medium text-zinc-400 hover:text-white transition-colors">← Back to site</Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs font-medium text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full">{session?.user?.email}</div>
          </div>
        </div>
      </div>
      <div className="container py-8 grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="h-fit sticky top-24">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4 font-bold">Management</div>
          <nav className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="no-underline rounded-xl px-4 py-2.5 text-sm font-medium transition-all hover:bg-zinc-900 hover:text-amber-500 text-zinc-400"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <form action="/api/auth/signout" method="post" className="mt-8">
            <button className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 hover:bg-red-900/10 hover:border-red-900/50 hover:text-red-500 text-sm font-medium transition-all text-zinc-500" type="submit">
              Sign out
            </button>
          </form>
        </aside>
        <main className="bg-zinc-900/30 rounded-3xl border border-zinc-800/50 p-6 md:p-8 shadow-2xl backdrop-blur-sm min-h-[600px]">
          {children}
        </main>
      </div>
    </div>
  );
}
