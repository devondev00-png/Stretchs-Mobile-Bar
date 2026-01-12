import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { sendInquiryEmail } from "@/lib/resend";
import { rateLimit } from "@/lib/ratelimit";
import { verifyHCaptcha } from "@/lib/hcaptcha";

const InquirySchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal("")),
  eventType: z.string().min(2),
  eventDate: z.string().optional().or(z.literal("")),
  location: z.string().min(2),
  guests: z.coerce.number().int().positive().optional(),
  packageSlug: z.string().optional().or(z.literal("")),
  message: z.string().min(10),
  company: z.string().optional().or(z.literal("")), // honeypot
  hcaptcha: z.string().optional().or(z.literal("")),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = InquirySchema.safeParse({ ...body, hcaptcha: body['h-captcha-response'] ?? body.hcaptcha ?? '' });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form", details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;

  // Simple rate limit: 5 requests / 10 minutes per IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rl = rateLimit(`inquiry:${ip}`, { tokens: 5, windowMs: 10 * 60 * 1000 });
  if (!rl.ok) return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });

  // Honeypot: bots fill hidden fields
  if (data.company && data.company.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Optional hCaptcha validation (only enforced if HCAPTCHA_SECRET is set)
  const captchaResult = await verifyHCaptcha(data.hcaptcha || null, ip);
  if (!captchaResult.ok) {
    return NextResponse.json({ error: captchaResult.error || "Captcha verification failed" }, { status: 400 });
  }

  const inquiry = await db.inquiry.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || null,
      eventType: data.eventType,
      eventDate: data.eventDate ? new Date(data.eventDate) : null,
      location: data.location,
      guests: data.guests ?? null,
      packageSlug: data.packageSlug || null,
      message: data.message,
    },
  });

  await sendInquiryEmail(inquiry);

  return NextResponse.json({ ok: true, id: inquiry.id });
}
