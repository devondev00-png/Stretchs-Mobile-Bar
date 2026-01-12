import { db } from "@/lib/db";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stretchs-mobile-bar.vercel.app";

  // Static routes
  const routes = [
    "",
    "/packages",
    "/gallery",
    "/faq",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic package routes
  const packages = await db.package.findMany({ select: { slug: true, updatedAt: true } });
  const packageRoutes = packages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: pkg.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...routes, ...packageRoutes];
}
