"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function setInquiryStatus(id: string, status: string) {
  await db.inquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin/inquiries");
}
