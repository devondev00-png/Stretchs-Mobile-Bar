"use client";

import { useState } from "react";
import { updateMedia } from "./actions";

export function EditMediaRow({ id, category, sortOrder }: { id: string; category: string | null; sortOrder: number }) {
  const [c, setC] = useState(category ?? "");
  const [s, setS] = useState<number>(sortOrder ?? 0);
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input className="rounded-xl border px-2 py-1 text-sm" value={c} onChange={(e) => setC(e.target.value)} placeholder="Category" />
      <input className="rounded-xl border px-2 py-1 text-sm w-24" type="number" value={s} onChange={(e) => setS(Number(e.target.value))} />
      <button
        type="button"
        className="rounded-xl border px-3 py-1 hover:bg-zinc-50 text-sm"
        onClick={async () => { await updateMedia(id, { category: c || null, sortOrder: s || 0 }); setMsg("Saved"); setTimeout(()=>setMsg(null), 1200); }}
      >
        Save
      </button>
      {msg ? <span className="text-xs text-zinc-500">{msg}</span> : null}
    </div>
  );
}
