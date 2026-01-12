"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addFaq(question: string, answer: string) {
  await db.fAQ.create({ data: { question, answer, sortOrder: 999 } });
  revalidatePath("/faq");
  revalidatePath("/admin/content");
}

export async function deleteFaq(id: string) {
  await db.fAQ.delete({ where: { id } });
  revalidatePath("/faq");
  revalidatePath("/admin/content");
}

export async function addTestimonial(name: string, quote: string, rating?: number) {
  await db.testimonial.create({ data: { name, quote, rating: rating ?? null } });
  revalidatePath("/");
  revalidatePath("/admin/content");
}

export async function deleteTestimonial(id: string) {
  await db.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/content");
}
