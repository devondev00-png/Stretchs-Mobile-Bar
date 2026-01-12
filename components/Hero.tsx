import Link from "next/link";
import { db } from "@/lib/db";

export async function Hero() {
  const settings = await db.siteSettings.findUnique({ where: { id: "singleton" } });

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-zinc-950">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt="Irish Garden Wedding"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950" />
      </div>

      <div className="container relative">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 backdrop-blur border border-emerald-500/50 text-sm text-emerald-400 font-medium shadow-sm mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Now booking for 2026 & 2027
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            {settings?.heroHeadline || "Authentic Irish Mobile Bar Hire for Weddings & Events"}
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-zinc-300 mb-8 leading-relaxed max-w-2xl">
            {settings?.heroSubheadline || "We bring the authentic taps, the style, and the service to make your occasion unforgettable."}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="no-underline inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-zinc-900 font-medium hover:opacity-90 transition-opacity shadow-lg"
            >
              Request a Quote
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/packages"
              className="no-underline inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-zinc-700 text-white hover:bg-zinc-800 transition-colors"
            >
              View Packages
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>5★ rated service</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>100+ events completed</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Professional bartenders</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
