"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <>
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-3xl font-bold text-zinc-900">Something went wrong!</h1>
                <p className="mt-2 text-zinc-600 max-w-md">
                    We apologize for the inconvenience. Our team has been notified.
                </p>
                <div className="mt-8 flex gap-4">
                    <button
                        onClick={() => reset()}
                        className="rounded-full border border-zinc-300 px-6 py-2 font-medium hover:bg-zinc-50 transition-colors"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="rounded-full bg-zinc-900 text-white px-6 py-2 font-medium hover:bg-zinc-800 transition-colors"
                    >
                        Back Home
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
}
