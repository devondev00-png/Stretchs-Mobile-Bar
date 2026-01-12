import Image from "next/image";
import { thumb } from "@/lib/images";

export function GalleryGrid({
  items,
}: {
  items: { id: string; url: string; alt: string | null; category: string | null }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {items.map((m, i) => (
        <div
          key={m.id}
          className="group relative rounded-2xl overflow-hidden border border-zinc-200/50 bg-zinc-100 img-shine"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={thumb(m.url, 600)}
              alt={m.alt ?? "Gallery image"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {m.category && (
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-zinc-900">
                  {m.category}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
