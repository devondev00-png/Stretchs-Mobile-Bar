import { db } from "@/lib/db";
import Image from "next/image";
import { thumb } from "@/lib/images";
import { EditMediaRow } from "./EditMediaRow";
import { deleteMedia } from "./actions";
import ClientUpload from "./ClientUpload";

export default async function AdminGallery() {
  const items = await db.media.findMany({ orderBy: { createdAt: "desc" }, take: 60 });

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Gallery</h1>

      <div className="rounded-2xl border bg-white p-6">
        <div className="font-semibold">Upload (Cloudinary)</div>
        <p className="mt-1 text-sm text-zinc-600">
          This uses a signed Cloudinary upload. Set CLOUDINARY_* env vars. After upload, the image is saved to the database.
        </p>

        <UploadForm />
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <div className="font-semibold">Latest media</div>
        <div className="mt-4 grid gap-3">
          {items.map(m => (
            <div key={m.id} className="rounded-xl border p-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 min-w-0">
                <div className="relative h-16 w-24 overflow-hidden rounded-xl border bg-zinc-50">
                  <Image src={thumb(m.url, 320)} alt={m.alt ?? "Media"} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-zinc-800 truncate">{m.url}</div>
                  <div className="text-xs text-zinc-500">{m.category ?? "Uncategorized"}</div>
                  <div className="mt-2">
                    <EditMediaRow id={m.id} category={m.category} sortOrder={m.sortOrder} />
                  </div>
                </div>
              </div>
              <form action={async () => { "use server"; await deleteMedia(m.id); }}>
                <button className="rounded-xl border px-3 py-2 hover:bg-zinc-50 text-sm" type="submit">Delete</button>
              </form>
            </div>
          ))}
          {items.length === 0 ? <div className="text-sm text-zinc-600">No media yet.</div> : null}
        </div>
      </div>
    </div>
  );
}

function UploadForm() {
  return (
    <div className="mt-4">
      <ClientUpload />
    </div>
  );
}
