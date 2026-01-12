"use client";

import { useState } from "react";
import { HCaptchaWidget } from "@/components/HCaptchaWidget";

export function InquiryForm({ defaultPackage }: { defaultPackage?: string }) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Submission failed");
      }
      setOk(true);
      e.currentTarget.reset();
    } catch (e: unknown) {
      const error = e as Error;
      setErr(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (ok) {
    return (
      <div className="card-elevated p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-zinc-900">Thanks — we&apos;ve got your request!</h3>
        <p className="mt-2 text-zinc-600">We&apos;ll reply within 24 hours to confirm availability and pricing.</p>
        <button
          className="mt-6 px-6 py-3 rounded-2xl border-2 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 font-medium transition-all"
          onClick={() => setOk(false)}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card-elevated p-6 md:p-8 grid gap-5">
      {/* Honeypot field */}
      <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Full name" name="fullName" required placeholder="Your name" />
        <Field label="Email" name="email" type="email" required placeholder="you@example.com" />
        <Field label="Phone (optional)" name="phone" placeholder="+353 87 060 9734" />
        <Field label="Event type" name="eventType" placeholder="Wedding, Birthday, Corporate..." required />
        <Field label="Event date (optional)" name="eventDate" type="date" />
        <Field label="Location" name="location" required placeholder="Venue or area" />
        <Field label="Guests (optional)" name="guests" type="number" placeholder="Approx. number" />
        <Field label="Preferred package" name="packageSlug" defaultValue={defaultPackage} placeholder="e.g. two-tap-setup" />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">Message</label>
        <textarea
          name="message"
          required
          minLength={10}
          className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
          rows={5}
          placeholder="Tell us about your event, timings, theme, and any add-ons you&apos;re interested in."
        />
      </div>

      {err && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {err}
        </div>
      )}

      <HCaptchaWidget />

      <button
        disabled={loading}
        className="w-full btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        type="submit"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </span>
        ) : (
          "Request a Quote"
        )}
      </button>

      <p className="text-xs text-zinc-500 text-center">
        By submitting, you agree we can contact you about this request. We typically reply within 24 hours.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 mb-2">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
      />
    </div>
  );
}
