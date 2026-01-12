import Link from "next/link";
import { db } from "@/lib/db";

export async function Hero() {
  const settings = await db.siteSettings.findUnique({ where: { id: "singleton" } });

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-200 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-40 w-96 h-96 bg-amber-100 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 backdrop-blur border border-amber-500/50 text-sm text-amber-400 font-medium shadow-sm mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Now booking for 2026 & 2027
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] animate-fade-in-up">
            <span className="text-gradient-dark">
              {settings?.heroHeadline ?? "Premium mobile bar hire for weddings, parties & events"}
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg md:text-xl text-zinc-600 max-w-2xl animate-fade-in-up stagger-1" style={{ animationDelay: "0.1s" }}>
            {settings?.heroSubheadline ?? "Taps, bar counters, fridges/freezers, glassware, furniture — and experienced bartenders. Based in Limerick, available nationwide."}
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up stagger-2" style={{ animationDelay: "0.2s" }}>
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2 no-underline"
            >
              Request a Quote
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/packages"
              className="btn-secondary inline-flex items-center gap-2 no-underline"
            >
              View Packages
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-zinc-500 animate-fade-in-up stagger-3" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>5★ rated service</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>100+ events completed</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Professional bartenders</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
