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
    <section className="py-12">
      <div className="container">
        <Link href="/packages" className="inline-flex items-center gap-2 text-sm text-zinc-600 no-underline hover:text-zinc-900 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to packages
        </Link>

        <div className="mt-6">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 bg-clip-text text-transparent">
            {pkg.title}
          </h1>
          <p className="mt-4 text-lg text-zinc-600 max-w-2xl">{pkg.description}</p>
        </div>

        {/* Package Images */}
        {pkg.images.length > 0 && (
          <div className="mt-8 grid gap-3 grid-cols-2 md:grid-cols-3">
            {pkg.images.map((img: any) => (
              <div key={img.id} className="relative aspect-[4/3] rounded-2xl overflow-hidden border bg-zinc-100">
                <Image
                  src={thumb(img.url, 600)}
                  alt={img.alt || pkg.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border bg-gradient-to-b from-white to-zinc-50/50 p-6 md:p-8">
            <div className="font-semibold text-lg">What&apos;s included</div>
            <div className="mt-4 space-y-2">
              {pkg.inclusions.split('\n').map((line: string, i: number) => (
                <div key={i} className="flex items-start gap-3 text-zinc-700">
                  {line.trim().startsWith('-') ? (
                    <>
                      <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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

          <div className="rounded-2xl border bg-gradient-to-b from-amber-50/50 to-white p-6 h-fit sticky top-20">
            <div className="font-semibold text-lg">Ready to book?</div>
            <p className="mt-2 text-sm text-zinc-600">
              Send an enquiry and we&apos;ll confirm availability and final quote for your event.
            </p>

            {pkg.priceFrom && (
              <div className="mt-4 py-3 border-y">
                <div className="text-sm text-zinc-500">Starting from</div>
                <div className="text-2xl font-semibold text-zinc-900">€{pkg.priceFrom}</div>
              </div>
            )}

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href={`/contact?package=${pkg.slug}`}
                className="rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-700 text-white px-4 py-3 no-underline hover:opacity-90 text-center font-medium transition-opacity shadow-lg shadow-zinc-900/20"
              >
                Request a Quote
              </Link>

              {pkg.depositCents ? (
                <form action={buyDeposit}>
                  <button
                    className="w-full rounded-2xl border-2 border-zinc-200 px-4 py-3 hover:border-zinc-300 hover:bg-zinc-50 transition-all font-medium"
                    type="submit"
                  >
                    Pay deposit (€{(pkg.depositCents / 100).toFixed(0)})
                  </button>
                </form>
              ) : null}

              <p className="text-xs text-zinc-500 text-center">
                {pkg.depositCents ? "Secure your date with a deposit" : "No deposit required upfront"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
