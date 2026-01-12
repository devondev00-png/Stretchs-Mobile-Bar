import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
    return (
        <>
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-9xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                    404
                </h1>
                <h2 className="mt-4 text-2xl font-semibold text-zinc-900">Page not found</h2>
                <p className="mt-2 text-zinc-600 max-w-md">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for. It seems the bar has moved to a new location.
                </p>
                <Link
                    href="/"
                    className="mt-8 rounded-full bg-zinc-900 text-white px-8 py-3 font-medium hover:bg-zinc-800 transition-colors"
                >
                    Back Home
                </Link>
            </main>
            <Footer />
        </>
    );
}
