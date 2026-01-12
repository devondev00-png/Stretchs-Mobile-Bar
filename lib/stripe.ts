import Stripe from "stripe";

const stripeSecret = process.env.STRIPE_SECRET_KEY;

export async function createCheckoutSession({
  name,
  amountCents,
  metadata,
}: {
  name: string;
  amountCents: number;
  metadata?: Record<string, string>;
}) {
  if (!stripeSecret) throw new Error("Missing STRIPE_SECRET_KEY");
  const stripe = new Stripe(stripeSecret, { apiVersion: "2024-06-20" as any });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${siteUrl}/deposit/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/deposit/cancel`,
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: { name },
          unit_amount: amountCents,
        },
        quantity: 1,
      },
    ],
    metadata,
  });

  if (!session.url) throw new Error("Stripe session URL missing");
  return session.url;
}
