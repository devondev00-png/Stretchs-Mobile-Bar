import { db } from "@/lib/db";
import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { GalleryGrid } from "@/components/GalleryGrid";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery | Stretchs Mobile Bar",
  description: "See our mobile bar setups from real events. Weddings, parties, corporate events, and festivals.",
  openGraph: {
    title: "Gallery | Stretchs Mobile Bar",
    description: "See our mobile bar setups from real events.",
  },
};

export default async function GalleryPage({ searchParams }: { searchParams: { c?: string } }) {
  const category = searchParams.c ?? "";
  const all = await db.media.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  const categories = Array.from(new Set(all.map((x: any) => x.category).filter(Boolean))) as string[];
  const items = category ? all.filter((x: any) => x.category === category) : all;

  return (
    <section className="py-12 md:py-20 bg-[#050505]">
      <div className="container">
        <SectionTitle
          title="Gallery"
          subtitle="Real setups from real events. See what we can create for you."
        />

        {/* Category filters */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            <Link
              href="/gallery"
              className={`px-4 py-2 rounded-full text-sm font-medium no-underline transition-all ${!category
                ? "bg-amber-600 text-white shadow-xl"
                : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800"
                }`}
            >
              All
            </Link>
            {categories.map(c => (
              <Link
                key={c}
                href={`/gallery?c=${encodeURIComponent(c)}`}
                className={`px-4 py-2 rounded-full text-sm font-medium no-underline transition-all ${category === c
                  ? "bg-amber-600 text-white shadow-xl"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:bg-zinc-800"
                  }`}
              >
                {c}
              </Link>
            ))}
          </div>
        )}

        {/* Gallery grid */}
        {items.length > 0 ? (
          <GalleryGrid items={items} />
        ) : (
          <div className="text-center py-20 bg-zinc-900/50 rounded-3xl border border-zinc-800">
            <div className="w-16 h-16 mx-auto rounded-full bg-zinc-800 flex items-center justify-center text-zinc-600 mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-white font-medium">No images yet.</p>
            <p className="text-sm text-zinc-500 mt-1">Check back soon for photos from our 2026/2027 events.</p>
          </div>
        )}

        {/* Instagram section */}
        <div className="mt-16">
          <InstagramEmbed />
        </div>
      </div>
    </section>
  );
}
