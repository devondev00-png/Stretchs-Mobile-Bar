"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function savePackageOrder(ids: string[]) {
  await Promise.all(ids.map((id, idx) => db.package.update({ where: { id }, data: { sortOrder: idx } })));
  revalidatePath("/packages");
  revalidatePath("/admin/reorder");
}

export async function saveMediaOrder(ids: string[]) {
  await Promise.all(ids.map((id, idx) => db.media.update({ where: { id }, data: { sortOrder: idx } })));
  revalidatePath("/gallery");
  revalidatePath("/admin/reorder");
}
