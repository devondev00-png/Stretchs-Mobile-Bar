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
    <section className="py-12 md:py-16">
      <div className="container">
        <SectionTitle
          title="Our Packages"
          subtitle="Choose a bar setup. We'll tailor it to your event size, theme, and venue. Add-ons available — glassware, furniture, fridges/freezers, and professional staff."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {packages.map(p => (
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
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <p className="text-zinc-600">No packages available yet.</p>
            <p className="text-sm text-zinc-500 mt-1">Check back soon or contact us directly.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 rounded-2xl bg-gradient-to-b from-amber-50 to-white border border-amber-100 p-8 text-center">
          <h3 className="text-xl font-semibold text-zinc-900">Need something custom?</h3>
          <p className="mt-2 text-zinc-600 max-w-lg mx-auto">
            We can create bespoke packages for larger events, festivals, or unique requirements. Get in touch and tell us what you&apos;re planning.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-2xl bg-zinc-900 text-white font-medium no-underline hover:opacity-90 transition-opacity"
          >
            Request a Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}
