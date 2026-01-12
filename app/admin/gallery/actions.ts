"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
}

export async function addMedia({ url, alt, category }: { url: string; alt?: string; category?: string }) {
  await checkAuth();
  await db.media.create({ data: { url, alt: alt || null, category: category || null } });
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function updateMedia(id: string, data: { category?: string | null; sortOrder?: number }) {
  await checkAuth();
  await db.media.update({ where: { id }, data });
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

export async function deleteMedia(id: string) {
  await checkAuth();
  await db.media.delete({ where: { id } });
  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}
