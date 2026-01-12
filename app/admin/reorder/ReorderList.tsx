"use client";

import { useMemo, useState } from "react";

type Item = { id: string; label: string; sortOrder: number };

export function ReorderList({
  title,
  items,
  onSave,
}: {
  title: string;
  items: Item[];
  onSave: (orderedIds: string[]) => Promise<void>;
}) {
  const [list, setList] = useState<Item[]>(() => [...items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)));
  const [dragId, setDragId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const orderedIds = useMemo(() => list.map(x => x.id), [list]);

  function onDragStart(id: string) {
    setDragId(id);
  }
  function onDrop(overId: string) {
    if (!dragId || dragId === overId) return;
    const next = [...list];
    const from = next.findIndex(x => x.id === dragId);
    const to = next.findIndex(x => x.id === overId);
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setList(next);
    setDragId(null);
  }

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      await onSave(orderedIds);
      setMsg("Saved");
      setTimeout(() => setMsg(null), 1200);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{title}</div>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="rounded-xl bg-zinc-900 text-white px-3 py-2 text-sm hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save order"}
        </button>
      </div>
      <p className="mt-2 text-sm text-zinc-600">Drag items to reorder. Lower items appear later on the site.</p>

      <div className="mt-4 grid gap-2">
        {list.map((it) => (
          <div
            key={it.id}
            draggable
            onDragStart={() => onDragStart(it.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(it.id)}
            className="rounded-xl border bg-white p-3 flex items-center justify-between"
          >
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{it.label}</div>
              <div className="text-xs text-zinc-500">Current sort: {it.sortOrder ?? 0}</div>
            </div>
            <div className="text-xs text-zinc-500">Drag ↕</div>
          </div>
        ))}
      </div>

      {msg ? <div className="mt-3 text-sm text-zinc-600">{msg}</div> : null}
    </div>
  );
}
