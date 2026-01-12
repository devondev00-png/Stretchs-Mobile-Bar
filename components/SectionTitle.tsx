export function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 md:mb-10">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-zinc-400 max-w-2xl text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
