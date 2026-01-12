import { db } from "@/lib/db";
import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ | Stretchs Mobile Bar",
  description: "Frequently asked questions about mobile bar hire, booking, areas covered, and what's included.",
  openGraph: {
    title: "FAQ | Stretchs Mobile Bar",
    description: "Frequently asked questions about mobile bar hire.",
  },
};

export default async function FAQPage() {
  const faqs = await db.fAQ.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <section className="py-12 md:py-16">
      <div className="container max-w-3xl">
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Quick answers to common questions. If you don't see yours, message us."
        />

        <div className="grid gap-3">
          {faqs.map((f: any) => (
            <details
              key={f.id}
              className="group card-elevated overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer p-5 font-medium text-zinc-900 hover:bg-zinc-50 transition-colors list-none">
                <span>{f.question}</span>
                <svg
                  className="w-5 h-5 text-zinc-400 group-open:rotate-180 transition-transform flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-5 text-zinc-600 leading-relaxed">
                {f.answer}
              </div>
            </details>
          ))}
        </div>

        {faqs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-zinc-600">No FAQs yet.</p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-b from-zinc-50 to-white border p-8 text-center">
          <h3 className="text-xl font-semibold text-zinc-900">Still have questions?</h3>
          <p className="mt-2 text-zinc-600">
            We&apos;re happy to help. Send us a message and we&apos;ll get back to you within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-2xl bg-zinc-900 text-white font-medium no-underline hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
