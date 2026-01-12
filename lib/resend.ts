import { Inquiry } from "@prisma/client";
import { Resend } from "resend";

export async function sendInquiryEmail(inquiry: Inquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.TO_EMAIL;
  const from = process.env.FROM_EMAIL;

  if (!apiKey || !to || !from) return;

  const resend = new Resend(apiKey);

  const subject = `New Booking Request — ${inquiry.eventType} (${inquiry.fullName})`;
  const text = [
    `Name: ${inquiry.fullName}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone ?? "-"}`,
    `Event: ${inquiry.eventType}`,
    `Date: ${inquiry.eventDate ? inquiry.eventDate.toDateString() : "-"}`,
    `Location: ${inquiry.location}`,
    `Guests: ${inquiry.guests ?? "-"}`,
    `Package: ${inquiry.packageSlug ?? "-"}`,
    "",
    inquiry.message,
  ].join("\n");

  await resend.emails.send({ to, from, subject, text });
}
