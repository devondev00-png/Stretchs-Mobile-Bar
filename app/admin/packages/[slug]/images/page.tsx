import { db } from "@/lib/db";
import { attachMediaToPackage, detachMedia } from "./actions";
import Link from "next/link";

export default async function PackageImagesPage({ params }: { params: { slug: string } }) {
  const pkg = await db.package.findUnique({ where: { slug: params.slug }, include: { images: true } });
  if (!pkg) return <div>Package not found.</div>;

  const allMedia = await db.media.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  const available = allMedia.filter(m => !m.packageId || m.packageId === pkg.id);

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Package images</h1>
          <p className="text-sm text-zinc-600">{pkg.title} • /{pkg.slug}</p>
        </div>
        <Link href="/admin/packages" className="rounded-xl border px-3 py-2 hover:bg-zinc-50 text-sm no-underline">
          ← Back
        </Link>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <div className="font-semibold">Currently attached</div>
        <div className="mt-4 grid gap-3">
          {pkg.images.map(m => (
            <div key={m.id} className="rounded-xl border p-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-sm truncate">{m.url}</div>
                <div className="text-xs text-zinc-500">{m.category ?? "Uncategorized"}</div>
              </div>
              <form action={async () => { "use server"; await detachMedia(m.id); }}>
                <button className="rounded-xl border px-3 py-2 hover:bg-zinc-50 text-sm" type="submit">Detach</button>
              </form>
            </div>
          ))}
          {pkg.images.length === 0 ? <div className="text-sm text-zinc-600">No images attached yet.</div> : null}
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <div className="font-semibold">Attach images</div>
        <p className="mt-1 text-sm text-zinc-600">Select from uploaded gallery items (Admin → Gallery).</p>

        <form action={async (fd: FormData) => {
          "use server";
          const ids = fd.getAll("mediaId").map(String);
          await attachMediaToPackage(pkg.slug, ids);
        }} className="mt-4 grid gap-3">
          <div className="grid gap-2 max-h-[420px] overflow-auto rounded-xl border p-3 bg-zinc-50">
            {available.map(m => (
              <label key={m.id} className="flex items-center gap-3 rounded-lg border bg-white p-3">
                <input type="checkbox" name="mediaId" value={m.id} />
                <div className="min-w-0">
                  <div className="text-sm truncate">{m.url}</div>
                  <div className="text-xs text-zinc-500">{m.category ?? "Uncategorized"}</div>
                </div>
              </label>
            ))}
            {available.length === 0 ? <div className="text-sm text-zinc-600">No media available.</div> : null}
          </div>

          <button className="rounded-2xl bg-zinc-900 text-white px-4 py-2 hover:opacity-90 w-fit" type="submit">
            Attach selected
          </button>
        </form>
      </div>
    </div>
  );
}
