import { NextResponse } from "next/server";
import { z } from "zod";
import { createCheckoutSession } from "@/lib/stripe";

const CheckoutSchema = z.object({
  packageSlug: z.string().min(1),
  packageTitle: z.string().min(1),
  amountCents: z.number().int().positive(),
  inquiryId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = CheckoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { packageSlug, packageTitle, amountCents, inquiryId } = parsed.data;

    const metadata: Record<string, string> = { packageSlug };
    if (inquiryId) metadata.inquiryId = inquiryId;

    const url = await createCheckoutSession({
      name: `Deposit: ${packageTitle}`,
      amountCents,
      metadata,
    });

    return NextResponse.json({ url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
