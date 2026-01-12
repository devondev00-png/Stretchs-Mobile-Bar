"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const Schema = z.object({
  id: z.string().optional(),
  slug: z.string().min(2),
  title: z.string().min(2),
  summary: z.string().min(2),
  description: z.string().min(2),
  inclusions: z.string().min(2),
  priceFrom: z.coerce.number().int().positive().optional().or(z.nan()),
  depositCents: z.coerce.number().int().positive().optional().or(z.nan()),
  isFeatured: z.coerce.boolean().optional(),
  sortOrder: z.coerce.number().int().optional().or(z.nan()),
});

export async function upsertPackage(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = Schema.safeParse({
    ...raw,
    priceFrom: raw.priceFrom ? Number(raw.priceFrom) : undefined,
    depositCents: raw.depositCents ? Number(raw.depositCents) : undefined,
    isFeatured: raw.isFeatured ? true : false,
    sortOrder: raw.sortOrder ? Number(raw.sortOrder) : undefined,
  });
  if (!parsed.success) throw new Error("Invalid form");

  const data = parsed.data;

  await db.package.upsert({
    where: { slug: data.slug },
    update: {
      title: data.title,
      summary: data.summary,
      description: data.description,
      inclusions: data.inclusions,
      priceFrom: Number.isFinite(data.priceFrom as any) ? (data.priceFrom as any) : null,
      depositCents: Number.isFinite(data.depositCents as any) ? (data.depositCents as any) : null,
      isFeatured: !!data.isFeatured,
      sortOrder: Number.isFinite(data.sortOrder as any) ? (data.sortOrder as any) : 0,
    },
    create: {
      slug: data.slug,
      title: data.title,
      summary: data.summary,
      description: data.description,
      inclusions: data.inclusions,
      priceFrom: Number.isFinite(data.priceFrom as any) ? (data.priceFrom as any) : null,
      depositCents: Number.isFinite(data.depositCents as any) ? (data.depositCents as any) : null,
      isFeatured: !!data.isFeatured,
      sortOrder: Number.isFinite(data.sortOrder as any) ? (data.sortOrder as any) : 0,
    },
  });

  revalidatePath("/packages");
  revalidatePath("/admin/packages");
}

export async function deletePackage(slug: string) {
  await db.package.delete({ where: { slug } });
  revalidatePath("/packages");
  revalidatePath("/admin/packages");
}
