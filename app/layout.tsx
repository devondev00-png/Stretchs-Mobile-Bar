import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stretchs Mobile Bar | Premium Mobile Bar & Event Hire",
  description: "Premium mobile bar hire and event setups in Limerick and surrounds. Professional bartenders, bar counters, taps, glassware, and furniture for weddings, parties, and corporate events.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://stretchs-mobile-bar.vercel.app"),
  keywords: ["mobile bar", "event hire", "wedding bar", "party bar", "Limerick", "Ireland", "bartenders", "cocktail bar"],
  authors: [{ name: "Stretchs Mobile Bar" }],
  creator: "Stretchs Mobile Bar",
  openGraph: {
    title: "Stretchs Mobile Bar | Premium Mobile Bar & Event Hire",
    description: "Premium mobile bar hire and event setups in Limerick and surrounds. Professional bartenders, bar counters, and equipment for any event.",
    type: "website",
    locale: "en_IE",
    siteName: "Stretchs Mobile Bar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stretchs Mobile Bar | Premium Mobile Bar & Event Hire",
    description: "Premium mobile bar hire and event setups in Limerick and surrounds.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
