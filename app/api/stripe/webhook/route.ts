import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret || !webhookSecret) {
    return NextResponse.json({ error: "Stripe env missing" }, { status: 500 });
  }

  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
  }

  // Handle completed checkout sessions (deposit payments)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const stripeSessionId = session.id;
    const amount = session.amount_total ?? 0;
    const currency = session.currency ?? "eur";
    const packageSlug = (session.metadata?.packageSlug as string | undefined) ?? null;
    const inquiryId = (session.metadata?.inquiryId as string | undefined) ?? null;
    const customerEmail =
      (session.customer_details?.email as string | undefined) ??
      (session.customer_email as string | undefined) ??
      null;

    // Idempotent upsert
    await db.payment.upsert({
      where: { stripeSessionId },
      update: { amountCents: amount, currency, packageSlug, customerEmail, status: "paid", inquiryId },
      create: { stripeSessionId, amountCents: amount, currency, packageSlug, customerEmail, status: "paid", inquiryId },
    });
  }

  return NextResponse.json({ received: true });
}
