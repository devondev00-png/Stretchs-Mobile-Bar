import { db } from "@/lib/db";
import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { PackageCard } from "@/components/PackageCard";

export const metadata: Metadata = {
  title: "Packages | Stretchs Mobile Bar",
  description: "Browse our mobile bar packages. From one-tap setups to full bar experiences with professional bartenders.",
  openGraph: {
    title: "Packages | Stretchs Mobile Bar",
    description: "Browse our mobile bar packages for weddings, parties, and events.",
  },
};

export default async function PackagesPage() {
  const packages = await db.package.findMany({
    orderBy: [{ sortOrder: "asc" }, { isFeatured: "desc" }, { updatedAt: "desc" }]
  });

  return (
    <section className="py-12 md:py-20 bg-[#050505]">
      <div className="container">
        <SectionTitle
          title="Our Packages"
          subtitle="Choose a bar setup. We'll tailor it to your event size, theme, and venue. Add-ons available — glassware, furniture, fridges/freezers, and professional staff."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p: any) => (
            <PackageCard
              key={p.id}
              slug={p.slug}
              title={p.title}
              summary={p.summary}
              priceFrom={p.priceFrom}
              featured={p.isFeatured}
            />
          ))}
        </div>

        {packages.length === 0 && (
          <div className="text-center py-20 bg-zinc-900/50 rounded-3xl border border-zinc-800">
            <div className="w-16 h-16 mx-auto rounded-full bg-zinc-800 flex items-center justify-center text-zinc-600 mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-white font-medium">No packages available yet.</p>
            <p className="text-sm text-zinc-500 mt-1">Contact us directly for 2026/2027 event pricing.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-white">Need something custom?</h3>
          <p className="mt-3 text-zinc-400 max-w-lg mx-auto text-lg">
            We can create bespoke bar experiences for larger events, festivals, or unique venue requirements.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-2xl bg-amber-600 text-white font-bold no-underline hover:bg-amber-500 transition-colors shadow-2xl"
          >
            Request a Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}
