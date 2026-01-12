import { db } from "@/lib/db";

export default async function AdminPayments() {
  const payments = await db.payment.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Payments</h1>

      <div className="rounded-2xl border bg-white p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-zinc-500">
              <th className="py-2">When</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Package</th>
              <th className="py-2">Email</th>
              <th className="py-2">Session</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id} className="border-t">
                <td className="py-3 pr-3 whitespace-nowrap">{p.createdAt.toISOString().slice(0,10)}</td>
                <td className="py-3 pr-3">€{(p.amountCents / 100).toFixed(2)}</td>
                <td className="py-3 pr-3">{p.packageSlug ?? "-"}</td>
                <td className="py-3 pr-3">{p.customerEmail ?? "-"}</td>
                <td className="py-3 pr-3 text-xs text-zinc-600">{p.stripeSessionId}</td>
              </tr>
            ))}
            {payments.length === 0 ? <tr><td className="py-6 text-zinc-600" colSpan={5}>No payments yet.</td></tr> : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
