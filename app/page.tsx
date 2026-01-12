import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { PackageCard } from "@/components/PackageCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import { GalleryGrid } from "@/components/GalleryGrid";
import Link from "next/link";
import { db } from "@/lib/db";

export default async function HomePage() {
  const [featured, testimonials, galleryPreview] = await Promise.all([
    db.package.findMany({
      where: { isFeatured: true },
      take: 3,
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }]
    }),
    db.testimonial.findMany({
      orderBy: { sortOrder: "asc" },
      take: 3
    }),
    db.media.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      take: 6
    }),
  ]);

  return (
    <>
      <Hero />

      {/* Services Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <SectionTitle
            title="What we offer"
            subtitle="Everything you need for a premium bar experience at your event."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                t: "Bespoke Mobile Units",
                d: "Hand-crafted wooden counters with copper accents, professional taps, and integrated cooling. A stunning focal point for any venue."
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                t: "Expert Mixologists",
                d: "Our team aren't just staff—they're experienced hosts. Polished, friendly, and skilled in the art of the perfect pour."
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                t: "Seamless Management",
                d: "From the first consultation to the final cleanup, we handle the logistics. Licensing, glassware, waste—consider it done."
              },
            ].map((x, i) => (
              <div
                key={x.t}
                className="card-elevated p-6 group hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                  {x.icon}
                </div>
                <h3 className="mt-4 font-semibold text-zinc-900">{x.t}</h3>
                <p className="mt-2 text-sm text-zinc-600">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-zinc-50 to-white">
        <div className="container">
          <SectionTitle
            title="Popular packages"
            subtitle="Pick a setup and we'll tailor it to your event size, theme and venue."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {featured.map((p: any) => (
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
          <div className="mt-8 text-center">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium no-underline transition-colors"
            >
              See all packages
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      {galleryPreview.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container">
            <SectionTitle
              title="Our work"
              subtitle="Real setups from real events. See what we can create for you."
            />
            <GalleryGrid items={galleryPreview} />
            <div className="mt-8 text-center">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium no-underline transition-colors"
              >
                View full gallery
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 md:py-20 bg-gradient-to-b from-amber-50/50 to-white">
          <div className="container">
            <SectionTitle
              title="What our clients say"
              subtitle="Hear from couples, event planners, and party hosts we've worked with."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((t: any) => (
                <TestimonialCard
                  key={t.id}
                  name={t.name}
                  quote={t.quote}
                  rating={t.rating}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Instagram Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <InstagramEmbed />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 p-8 md:p-12 lg:p-16">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <div className="absolute top-10 right-10 w-64 h-64 bg-amber-400 rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-32 w-48 h-48 bg-amber-500 rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                  Ready to plan your event?
                </h2>
                <p className="mt-3 text-zinc-300">
                  Tell us the date, location and guest count — we&apos;ll come back with options and a quote within 24 hours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-zinc-900 font-medium no-underline hover:bg-zinc-100 transition-colors shadow-lg"
                >
                  Request a Quote
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/packages"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-zinc-600 text-white font-medium no-underline hover:bg-zinc-800 transition-colors"
                >
                  View Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
