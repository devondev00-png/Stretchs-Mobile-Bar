export function TestimonialCard({
    name,
    quote,
    rating,
}: {
    name: string;
    quote: string;
    rating?: number | null;
}) {
    return (
        <div className="card-elevated p-6 flex flex-col h-full bg-zinc-900 border-zinc-800">
            {/* Rating stars */}
            {rating && (
                <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                            key={star}
                            className={`w-5 h-5 ${star <= rating ? "text-amber-500" : "text-zinc-800"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
            )}

            {/* Quote */}
            <blockquote className="flex-1">
                <p className="text-zinc-400 leading-relaxed italic">&quot;{quote}&quot;</p>
            </blockquote>

            {/* Author */}
            <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-amber-500 font-bold text-sm border border-zinc-700">
                    {name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <div className="font-medium text-white">{name}</div>
                    <div className="text-sm text-zinc-500">Verified Customer</div>
                </div>
            </div>
        </div>
    );
}
