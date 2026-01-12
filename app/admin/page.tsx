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
      <h1 className="text-3xl font-bold tracking-tight text-white mb-2 italic">Dashboard</h1>
      <p className="text-zinc-500 mb-6 font-medium">Welcome to the Stretch&apos;s Mobile Bar management portal.</p>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Packages" value={pkgCount} icon="package" />
        <Card title="Gallery items" value={mediaCount} icon="image" />
        <Card title="Inquiries" value={inquiryCount} icon="mail" />
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-8 backdrop-blur-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Latest Inquiries</h2>
          <Link href="/admin/inquiries" className="text-sm font-medium text-amber-500 hover:text-amber-400 no-underline transition-colors">View all →</Link>
        </div>
        <div className="grid gap-4">
          {latest.map((i: any) => (
            <div key={i.id} className="group rounded-2xl border border-zinc-800 bg-black/40 p-5 transition-all hover:border-zinc-700 hover:bg-black/60">
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="font-bold text-white text-lg">
                  {i.fullName}
                  <span className="ml-2 text-zinc-500 text-sm font-normal">({i.eventType})</span>
                </div>
                <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border ${i.status === 'NEW' ? 'border-amber-500/50 bg-amber-500/10 text-amber-500' : 'border-zinc-700 bg-zinc-800 text-zinc-400'
                  }`}>
                  {i.status}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-500 mb-3">
                <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-zinc-700" /> {i.email}</span>
                <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-zinc-700" /> {i.location}</span>
              </div>
              <div className="text-sm text-zinc-400 line-clamp-2 leading-relaxed italic">&quot;{i.message}&quot;</div>
            </div>
          ))}
          {latest.length === 0 ? <div className="text-center py-10 text-zinc-600 bg-black/20 rounded-2xl border border-dashed border-zinc-800">No inquiries yet. New requests will appear here.</div> : null}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, icon }: { title: string; value: number; icon: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:scale-[1.02] hover:bg-zinc-900/80">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">
        {icon === 'package' && <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
        {icon === 'image' && <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
        {icon === 'mail' && <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
        {title}
      </div>
      <div className="text-4xl font-black text-white">{value}</div>
    </div>
  );
}
