"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function attachMediaToPackage(slug: string, mediaIds: string[]) {
  const pkg = await db.package.findUnique({ where: { slug } });
  if (!pkg) throw new Error("Package not found");

  // Attach selected media
  await db.media.updateMany({
    where: { id: { in: mediaIds } },
    data: { packageId: pkg.id },
  });

  revalidatePath(`/admin/packages/${slug}/images`);
  revalidatePath(`/packages/${slug}`);
}

export async function detachMedia(mediaId: string) {
  await db.media.update({ where: { id: mediaId }, data: { packageId: null } });
  revalidatePath(`/admin/packages`);
  revalidatePath(`/gallery`);
}
