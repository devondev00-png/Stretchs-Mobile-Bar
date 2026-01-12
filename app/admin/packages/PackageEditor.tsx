"use client";

import { useMemo, useState } from "react";

export type PackageRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  inclusions: string;
  priceFrom: number | null;
  depositCents: number | null;
  isFeatured: boolean;
  sortOrder: number;
};

export function PackageEditor({
  packages,
  upsertAction,
}: {
  packages: PackageRow[];
  upsertAction: (fd: FormData) => Promise<void>;
}) {
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const selected = useMemo(() => packages.find(p => p.slug === selectedSlug) || null, [packages, selectedSlug]);

  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="font-semibold">Create / update package</div>
      <p className="mt-1 text-sm text-zinc-600">Pick an existing package to auto-fill and edit, or create a new one.</p>

      <div className="mt-4 grid gap-2">
        <label className="text-sm font-medium">Edit existing (optional)</label>
        <select
          className="rounded-xl border px-3 py-2"
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
        >
          <option value="">— Create new —</option>
          {packages.map(p => (
            <option key={p.id} value={p.slug}>{p.title} ({p.slug})</option>
          ))}
        </select>
      </div>

      <form action={upsertAction} className="mt-4 grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Sort order" name="sortOrder" type="number" defaultValue={selected?.sortOrder ?? 0} />
          <Field label="Slug" name="slug" placeholder="two-tap-setup" required defaultValue={selected?.slug ?? ""} />
          <Field label="Title" name="title" placeholder="Two Tap Setup Party Package" required defaultValue={selected?.title ?? ""} />
          <Field label="Summary" name="summary" placeholder="Short card summary..." required defaultValue={selected?.summary ?? ""} />
          <Field label="Price from (€) (optional)" name="priceFrom" type="number" defaultValue={selected?.priceFrom ?? ""} />
          <Field label="Deposit cents (optional)" name="depositCents" type="number" placeholder="5000 = €50" defaultValue={selected?.depositCents ?? ""} />
          <label className="flex items-center gap-2 text-sm mt-7">
            <input name="isFeatured" type="checkbox" className="h-4 w-4" defaultChecked={selected?.isFeatured ?? false} /> Featured
          </label>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Description</label>
          <textarea name="description" className="rounded-xl border px-3 py-2" rows={3} required defaultValue={selected?.description ?? ""} />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Inclusions (one per line)</label>
          <textarea name="inclusions" className="rounded-xl border px-3 py-2" rows={6} required defaultValue={selected?.inclusions ?? ""} />
        </div>

        <button className="rounded-2xl bg-zinc-900 text-white px-4 py-2 hover:opacity-90 w-fit" type="submit">
          Save package
        </button>
      </form>
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
