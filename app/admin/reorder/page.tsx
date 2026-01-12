import { db } from "@/lib/db";
import { ReorderList } from "./ReorderList";
import { savePackageOrder, saveMediaOrder } from "./actions";

export default async function AdminReorder() {
  const [pkgs, media] = await Promise.all([
    db.package.findMany({ select: { id: true, title: true, sortOrder: true }, orderBy: { sortOrder: "asc" } }),
    db.media.findMany({ select: { id: true, url: true, sortOrder: true }, orderBy: { sortOrder: "asc" }, take: 80 }),
  ]);

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Reorder</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <ReorderList
          title="Packages order"
          items={pkgs.map(p => ({ id: p.id, label: p.title, sortOrder: p.sortOrder }))}
          onSave={async (ids) => { "use server"; await savePackageOrder(ids); }}
        />
        <ReorderList
          title="Gallery order (latest 80)"
          items={media.map(m => ({ id: m.id, label: m.url, sortOrder: m.sortOrder }))}
          onSave={async (ids) => { "use server"; await saveMediaOrder(ids); }}
        />
      </div>
      <p className="text-xs text-zinc-500">Tip: For gallery, you can still override category + sort in Admin → Gallery.</p>
    </div>
  );
}
