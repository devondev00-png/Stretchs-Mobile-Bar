import { db } from "@/lib/db";

export async function InstagramEmbed() {
  // Instagram embeds can be blocked by browser privacy settings; provide a strong fallback.
  const s = await db.siteSettings.findUnique({ where: { id: "singleton" } });
  const handle = s?.instagramHandle || "stretchs_mobile_bar";
  const url = `https://www.instagram.com/${handle}/`;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold">Instagram</div>
          <p className="mt-1 text-sm text-zinc-600">See the latest setups, events and behind-the-scenes.</p>
        </div>
        <a href={url} target="_blank" rel="noreferrer" className="rounded-xl border px-3 py-2 text-sm no-underline hover:bg-zinc-50">
          Open Instagram
        </a>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border bg-zinc-50">
        {/* Official embed endpoint (may not always render depending on IG policies) */}
        <iframe
          title="Stretchs Mobile Bar Instagram"
          src={`https://www.instagram.com/${handle}/embed`}
          className="w-full"
          style={{ height: 520, border: 0 }}
          loading="lazy"
        />
      </div>

      <p className="mt-3 text-xs text-zinc-500">
        If the embed doesn’t load, use the button above to view the feed directly.
      </p>
    </div>
  );
}
