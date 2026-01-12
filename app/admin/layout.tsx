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
    <div className="min-h-screen bg-zinc-50">
      <div className="border-b bg-white">
        <div className="container h-14 flex items-center justify-between">
          <Link href="/" className="no-underline font-semibold">← Back to site</Link>
          <div className="text-sm text-zinc-600">{session?.user?.email}</div>
        </div>
      </div>
      <div className="container py-8 grid gap-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-2xl border bg-white p-4 h-fit">
          <div className="text-xs text-zinc-500 mb-2">Admin</div>
          <nav className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="no-underline rounded-xl px-3 py-2 hover:bg-zinc-50">
                {n.label}
              </Link>
            ))}
          </nav>
          <form action="/api/auth/signout" method="post" className="mt-4">
            <button className="w-full rounded-xl border px-3 py-2 hover:bg-zinc-50 text-sm" type="submit">
              Sign out
            </button>
          </form>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
