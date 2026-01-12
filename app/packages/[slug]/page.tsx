import { db } from "@/lib/db";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createCheckoutSession } from "@/lib/stripe";
import { thumb } from "@/lib/images";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const pkg = await db.package.findUnique({ where: { slug: params.slug } });
  if (!pkg) return { title: "Package | Stretchs Mobile Bar" };
  return {
    title: `${pkg.title} | Stretchs Mobile Bar`,
    description: pkg.summary,
    openGraph: {
      title: `${pkg.title} | Stretchs Mobile Bar`,
      description: pkg.summary,
      type: "article",
    },
  };
}

export default async function PackageDetail({ params, searchParams }: { params: { slug: string }; searchParams?: { inquiryId?: string } }) {
  const pkg = await db.package.findUnique({ where: { slug: params.slug }, include: { images: { orderBy: { sortOrder: "asc" }, take: 6 } } });
  if (!pkg) return notFound();

  async function buyDeposit() {
    "use server";
    // Fix: 'pkg' is possibly 'null'
    if (!pkg) return;
    if (!pkg.depositCents) return;
    const url = await createCheckoutSession({
      name: `Deposit: ${pkg.title}`,
      amountCents: pkg.depositCents,
      metadata: { packageSlug: pkg.slug, ...(searchParams?.inquiryId ? { inquiryId: String(searchParams.inquiryId) } : {}) },
    });
    redirect(url);
  }

  return (
    <section className="py-12 md:py-20 bg-[#050505]">
      <div className="container">
        <Link href="/packages" className="inline-flex items-center gap-2 text-sm text-zinc-400 no-underline hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          Back to packages
        </Link>

        <div className="mt-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            {pkg.title}
          </h1>
          <p className="mt-4 text-lg text-zinc-400 max-w-2xl leading-relaxed">{pkg.description}</p>
        </div>

        {/* Package Images */}
        {pkg.images.length > 0 && (
          <div className="mt-12 grid gap-4 grid-cols-2 md:grid-cols-3">
            {pkg.images.map((img: any) => (
              <div key={img.id} className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900">
                <Image
                  src={thumb(img.url, 600)}
                  alt={img.alt || pkg.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 md:p-10">
            <div className="font-bold text-xl text-white">What&apos;s included</div>
            <div className="mt-6 space-y-4">
              {pkg.inclusions.split('\n').map((line: string, i: number) => (
                <div key={i} className="flex items-start gap-3 text-zinc-400 text-lg">
                  {line.trim().startsWith('-') ? (
                    <>
                      <svg className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{line.replace(/^-\s*/, '')}</span>
                    </>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black p-8 h-fit sticky top-24 shadow-2xl">
            <div className="font-bold text-xl text-white">Ready to book?</div>
            <p className="mt-3 text-zinc-400">
              Send an enquiry and we&apos;ll confirm availability for 2026/2027.
            </p>

            {pkg.priceFrom && (
              <div className="mt-6 py-4 border-y border-zinc-800">
                <div className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">Starting from</div>
                <div className="text-3xl font-bold text-white mt-1">€{pkg.priceFrom}</div>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-4">
              <Link
                href={`/contact?package=${pkg.slug}`}
                className="rounded-2xl bg-amber-600 text-white px-6 py-4 no-underline hover:bg-amber-500 text-center font-bold transition-colors shadow-2xl shadow-amber-900/20"
              >
                Request a Quote
              </Link>

              {pkg.depositCents ? (
                <form action={buyDeposit}>
                  <button
                    className="w-full rounded-2xl border-2 border-zinc-800 px-6 py-4 hover:bg-zinc-800 text-white transition-all font-bold"
                    type="submit"
                  >
                    Pay deposit (€{(pkg.depositCents / 100).toFixed(0)})
                  </button>
                </form>
              ) : null}

              <p className="text-xs text-zinc-500 text-center font-medium">
                {pkg.depositCents ? "Secure your date with a secure Stripe deposit" : "Custom quote required for this setup"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
