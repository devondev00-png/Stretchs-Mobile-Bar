import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deposit Cancelled | Stretchs Mobile Bar",
};

export default function DepositCancel() {
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-lg">
        <div className="card-elevated p-8 text-center">
          {/* Cancel/Info icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 mb-6">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Deposit cancelled
          </h1>
          <p className="mt-3 text-zinc-600">
            No worries — no payment was taken. You can try again whenever you&apos;re ready, or just send us a standard enquiry without a deposit.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-2xl bg-zinc-900 text-white font-medium no-underline hover:opacity-90 transition-opacity"
            >
              Send an enquiry
            </Link>
            <Link
              href="/packages"
              className="px-6 py-3 rounded-2xl border-2 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 font-medium no-underline transition-all"
            >
              Back to packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
