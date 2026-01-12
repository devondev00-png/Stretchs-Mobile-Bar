import Link from "next/link";

export function PackageCard({
  slug,
  title,
  summary,
  priceFrom,
  featured,
}: {
  slug: string;
  title: string;
  summary: string;
  priceFrom?: number | null;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/packages/${slug}`}
      className="group no-underline card-elevated p-6 hover:-translate-y-1 transition-all duration-300 bg-zinc-900 border-zinc-800"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white group-hover:text-amber-500 transition-colors">
              {title}
            </h3>
            {featured && (
              <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-900/20 text-amber-500 border border-amber-500/20">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Popular
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{summary}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between">
        <div className="text-sm text-zinc-300">
          {priceFrom ? (
            <>
              From <span className="font-semibold text-white">€{priceFrom}</span>
            </>
          ) : (
            <span className="text-zinc-500">Custom pricing</span>
          )}
        </div>
        <div className="text-sm font-medium text-amber-500 group-hover:text-amber-400 flex items-center gap-1 transition-colors">
          View details
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
