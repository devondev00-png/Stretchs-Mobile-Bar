import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deposit Received | Stretchs Mobile Bar",
};

export default function DepositSuccess({ searchParams }: { searchParams: { session_id?: string } }) {
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-lg">
        <div className="card-elevated p-8 text-center">
          {/* Success icon */}
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Deposit received 🎉
          </h1>
          <p className="mt-3 text-zinc-600">
            Thanks — your deposit has been processed successfully. We&apos;ll be in touch shortly to confirm the final details for your event.
          </p>

          {searchParams.session_id && (
            <div className="mt-6 p-3 rounded-xl bg-zinc-50 border">
              <p className="text-xs text-zinc-500">
                Reference: <span className="font-mono">{searchParams.session_id.slice(0, 20)}...</span>
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/packages"
              className="px-6 py-3 rounded-2xl border-2 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 font-medium no-underline transition-all"
            >
              Back to packages
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-2xl bg-zinc-900 text-white font-medium no-underline hover:opacity-90 transition-opacity"
            >
              Send an enquiry
            </Link>
          </div>

          <p className="mt-6 text-sm text-zinc-500">
            Questions? Email us and we&apos;ll help you out.
          </p>
        </div>
      </div>
    </section>
  );
}
