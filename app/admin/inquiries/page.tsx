import { db } from "@/lib/db";
import { setInquiryStatus } from "./actions";

const statuses = ["new", "contacted", "booked", "archived"];

export default async function AdminInquiries() {
  const inquiries = await db.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Inquiries</h1>

      <div className="rounded-2xl border bg-white p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-zinc-500">
              <th className="py-2">When</th>
              <th className="py-2">Name</th>
              <th className="py-2">Event</th>
              <th className="py-2">Location</th>
              <th className="py-2">Contact</th>
              <th className="py-2">Status</th>
              <th className="py-2">Deposit</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(i => (
              <tr key={i.id} className="border-t">
                <td className="py-3 pr-3 whitespace-nowrap">{i.createdAt.toISOString().slice(0,10)}</td>
                <td className="py-3 pr-3">{i.fullName}</td>
                <td className="py-3 pr-3">{i.eventType}</td>
                <td className="py-3 pr-3">{i.location}</td>
                <td className="py-3 pr-3">
                  <div>{i.email}</div>
                  {i.phone ? <div className="text-zinc-500">{i.phone}</div> : null}
                </td>
                <td className="py-3">
                  <form action={async (fd: FormData) => { "use server"; await setInquiryStatus(i.id, String(fd.get("status"))); }}>
                    <select name="status" defaultValue={i.status} className="rounded-xl border px-2 py-1">
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button className="ml-2 rounded-xl border px-3 py-1 hover:bg-zinc-50" type="submit">Save</button>
                  </form>
                </td>
                <td className="py-3">
                  <a className="rounded-xl border px-3 py-1 hover:bg-zinc-50 text-sm no-underline" href={`/packages/${i.packageSlug ?? 'two-tap-setup'}?inquiryId=${i.id}`}>Pay link</a>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 ? (
              <tr><td className="py-6 text-zinc-600" colSpan={7}>No inquiries yet.</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
