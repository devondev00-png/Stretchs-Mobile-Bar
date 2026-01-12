export function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 md:mb-10">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-zinc-600 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
