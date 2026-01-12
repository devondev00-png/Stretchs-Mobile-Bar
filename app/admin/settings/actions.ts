"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function saveSettings(fd: FormData) {
  const data = {
    businessName: String(fd.get("businessName") || "Stretchs Mobile Bar"),
    phone: String(fd.get("phone") || "") || null,
    email: String(fd.get("email") || "") || null,
    location: String(fd.get("location") || "") || null,
    instagramHandle: String(fd.get("instagramHandle") || "") || null,
    heroHeadline: String(fd.get("heroHeadline") || "") || null,
    heroSubheadline: String(fd.get("heroSubheadline") || "") || null,
  };

  await db.siteSettings.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });

  revalidatePath("/");
  revalidatePath("/gallery");
  revalidatePath("/admin/settings");
}
