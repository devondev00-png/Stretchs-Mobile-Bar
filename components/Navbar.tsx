"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/packages", label: "Packages" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="no-underline font-semibold text-lg tracking-tight flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700">
            <img
              src="/logo.jpg"
              alt="Stretchs Mobile Bar Logo"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <span className="hidden sm:inline text-white">Stretchs Mobile Bar</span>
          <span className="sm:hidden text-white">Stretchs</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="no-underline px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="no-underline ml-2 px-5 py-2.5 text-sm font-medium text-white bg-amber-600 rounded-xl hover:bg-amber-500 transition-colors shadow-sm"
          >
            Get a Quote
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 -mr-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-black">
          <nav className="container py-4 flex flex-col gap-1">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="no-underline px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="no-underline mt-2 px-4 py-3 text-center font-medium text-white bg-gradient-to-r from-zinc-900 to-zinc-700 rounded-xl hover:opacity-90 transition-opacity"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
