import { db } from "@/lib/db";
import { upsertPackage, deletePackage } from "./actions";
import { PackageEditor } from "./PackageEditor";

export default async function AdminPackages() {
  const packages = await db.package.findMany({ orderBy: [{ sortOrder: "asc" }, { isFeatured: "desc" }, { updatedAt: "desc" }] });

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Packages</h1>

      <PackageEditor packages={packages as any} upsertAction={upsertPackage} />

      <div className="rounded-2xl border bg-white p-6">
        <div className="font-semibold">Existing packages</div>
        <div className="mt-4 grid gap-3">
          {packages.map(p => (
            <div key={p.id} className="rounded-xl border p-4 flex items-start justify-between gap-4">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-zinc-600">/{p.slug}</div>
                <div className="text-sm text-zinc-600 mt-1">{p.summary}</div>
              </div>
              <div className="flex gap-2">
                <a className="rounded-xl border px-3 py-2 hover:bg-zinc-50 text-sm no-underline" href={`/admin/packages/${p.slug}/images`}>Manage images</a>
                <form action={async () => { "use server"; await deletePackage(p.slug); }}>

                <button className="rounded-xl border px-3 py-2 hover:bg-zinc-50 text-sm" type="submit">
                  Delete
                </button>
              </form>
              </div>
            </div>
          ))}
          {packages.length === 0 ? <div className="text-sm text-zinc-600">No packages yet.</div> : null}
        </div>
      </div>
    </div>
  );
}

function Field(props: any) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium">{props.label}</label>
      <input {...props} className="rounded-xl border px-3 py-2" />
    </div>
  );
}
