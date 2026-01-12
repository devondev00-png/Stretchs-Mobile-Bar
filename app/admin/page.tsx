import Link from "next/link";
import { db } from "@/lib/db";

export default async function AdminDashboard() {
  const [pkgCount, mediaCount, inquiryCount] = await Promise.all([
    db.package.count(),
    db.media.count(),
    db.inquiry.count(),
  ]);

  const latest = await db.inquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } });

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold tracking-tight text-white">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Packages" value={pkgCount} />
        <Card title="Gallery items" value={mediaCount} />
        <Card title="Inquiries" value={inquiryCount} />
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="font-semibold text-white">Latest inquiries</div>
        <div className="mt-4 grid gap-3">
          {latest.map((i: any) => (
            <div key={i.id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-medium text-white">{i.fullName} <span className="text-zinc-500 text-sm">({i.eventType})</span></div>
                <span className="text-xs rounded-full border border-zinc-700 bg-zinc-800 px-2 py-1 text-zinc-400">{i.status}</span>
              </div>
              <div className="mt-1 text-sm text-zinc-400">{i.email} • {i.location}</div>
              <div className="mt-2 text-sm text-zinc-500 line-clamp-2">{i.message}</div>
            </div>
          ))}
          {latest.length === 0 ? <div className="text-sm text-zinc-500">No inquiries yet.</div> : null}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="text-sm text-zinc-500">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
    </div>
  );
}
