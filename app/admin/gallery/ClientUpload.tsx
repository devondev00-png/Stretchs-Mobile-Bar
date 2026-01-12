"use client";

import { useState } from "react";
import { addMedia } from "./actions";

export default function ClientUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [alt, setAlt] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function upload() {
    if (!file) return;
    setLoading(true);
    setMsg(null);

    try {
      const sigRes = await fetch("/api/admin/cloudinary-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: "stretchs-mobile-bar" }),
      });
      if (!sigRes.ok) throw new Error("Auth/Signature failed");
      const sig = await sigRes.json();

      const form = new FormData();
      form.append("file", file);
      form.append("api_key", sig.apiKey);
      form.append("timestamp", String(sig.timestamp));
      form.append("signature", sig.signature);
      form.append("folder", sig.folder);

      const upRes = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, {
        method: "POST",
        body: form,
      });
      if (!upRes.ok) throw new Error("Upload failed");
      const up = await upRes.json();

      await addMedia({ url: up.secure_url, alt: alt || undefined, category: category || undefined });
      setMsg("Uploaded!");
      setFile(null);
      (document.getElementById("file") as HTMLInputElement | null)?.value && ((document.getElementById("file") as HTMLInputElement).value = "");
    } catch (e: any) {
      setMsg(e.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-3">
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <label className="text-sm font-medium">File</label>
          <input id="file" type="file" accept="image/*" className="mt-2 w-full" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
        <div>
          <label className="text-sm font-medium">Category (optional)</label>
          <input className="mt-2 w-full rounded-xl border px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Cocktail Bar" />
        </div>
        <div>
          <label className="text-sm font-medium">Alt text (optional)</label>
          <input className="mt-2 w-full rounded-xl border px-3 py-2" value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Bar counter setup" />
        </div>
      </div>
      <button
        type="button"
        onClick={upload}
        disabled={!file || loading}
        className="rounded-2xl bg-zinc-900 text-white px-4 py-2 hover:opacity-90 disabled:opacity-60 w-fit"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {msg ? <div className="text-sm text-zinc-600">{msg}</div> : null}
    </div>
  );
}
