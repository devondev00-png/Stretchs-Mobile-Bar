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
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Packages" value={pkgCount} />
        <Card title="Gallery items" value={mediaCount} />
        <Card title="Inquiries" value={inquiryCount} />
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <div className="font-semibold">Latest inquiries</div>
        <div className="mt-4 grid gap-3">
          {latest.map(i => (
            <div key={i.id} className="rounded-xl border p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-medium">{i.fullName} <span className="text-zinc-500 text-sm">({i.eventType})</span></div>
                <span className="text-xs rounded-full border px-2 py-1">{i.status}</span>
              </div>
              <div className="mt-1 text-sm text-zinc-600">{i.email} • {i.location}</div>
              <div className="mt-2 text-sm text-zinc-700 line-clamp-2">{i.message}</div>
            </div>
          ))}
          {latest.length === 0 ? <div className="text-sm text-zinc-600">No inquiries yet.</div> : null}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="text-sm text-zinc-500">{title}</div>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
    </div>
  );
}
