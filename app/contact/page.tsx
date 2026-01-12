import type { Metadata } from "next";
import { InquiryForm } from "@/components/InquiryForm";
import { SectionTitle } from "@/components/SectionTitle";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Contact | Stretchs Mobile Bar",
  description: "Get in touch for a quote. Tell us about your event and we'll come back with the best setup for your venue.",
  openGraph: {
    title: "Contact | Stretchs Mobile Bar",
    description: "Get in touch for a mobile bar quote.",
  },
};

export default async function ContactPage({ searchParams }: { searchParams: { package?: string } }) {
  const settings = await db.siteSettings.findUnique({ where: { id: "singleton" } });

  return (
    <section className="py-12 md:py-20 bg-[#050505]">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
          {/* Left column - Info */}
          <div>
            <SectionTitle
              title="Get a Quote"
              subtitle="Tell us what you're planning and we'll come back with the best setup for your venue and guest count."
            />

            {/* What to include */}
            <div className="card-elevated p-6 bg-zinc-900 border-zinc-800">
              <h3 className="font-semibold text-white">What to include</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Date and location of your event",
                  "Approximate guest count",
                  "Indoor or outdoor venue",
                  "Preferred taps, cocktails, or add-ons",
                  "Any special requirements or theme",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                    <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div className="mt-6 card-elevated p-6 bg-zinc-900 border-zinc-800">
              <h3 className="font-semibold text-white">Direct contact</h3>
              <div className="mt-4 space-y-4 text-sm text-zinc-400">
                {settings?.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-3 hover:text-white no-underline transition-colors"
                  >
                    <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {settings.email}
                  </a>
                )}
                {settings?.phone && (
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex items-center gap-3 hover:text-white no-underline transition-colors"
                  >
                    <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {settings.phone}
                  </a>
                )}
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {settings?.location || "Limerick & surrounds"}
                </div>
              </div>
            </div>

            {/* Response time */}
            <div className="mt-8 flex items-center gap-3 text-sm text-zinc-400">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Usually reply within 24 hours</span>
            </div>
          </div>

          {/* Right column - Form */}
          <div>
            <InquiryForm defaultPackage={searchParams.package} />
          </div>
        </div>
      </div>
    </section>
  );
}
