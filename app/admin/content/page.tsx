import { db } from "@/lib/db";
import { addFaq, deleteFaq, addTestimonial, deleteTestimonial } from "./actions";

export default async function AdminContent() {
  const [faqs, testimonials] = await Promise.all([
    db.fAQ.findMany({ orderBy: { sortOrder: "asc" } }),
    db.testimonial.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Content</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6">
          <div className="font-semibold">FAQs</div>
          <form action={async (fd: FormData) => { "use server"; await addFaq(String(fd.get("q")), String(fd.get("a"))); }} className="mt-4 grid gap-3">
            <input name="q" className="rounded-xl border px-3 py-2" placeholder="Question" required />
            <textarea name="a" className="rounded-xl border px-3 py-2" placeholder="Answer" rows={3} required />
            <button className="rounded-2xl bg-zinc-900 text-white px-4 py-2 hover:opacity-90 w-fit" type="submit">Add FAQ</button>
          </form>
          <div className="mt-5 grid gap-3">
            {faqs.map(f => (
              <div key={f.id} className="rounded-xl border p-4">
                <div className="font-medium">{f.question}</div>
                <div className="mt-1 text-sm text-zinc-600">{f.answer}</div>
                <form action={async () => { "use server"; await deleteFaq(f.id); }} className="mt-3">
                  <button className="rounded-xl border px-3 py-1 hover:bg-zinc-50 text-sm" type="submit">Delete</button>
                </form>
              </div>
            ))}
            {faqs.length === 0 ? <div className="text-sm text-zinc-600">No FAQs yet.</div> : null}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <div className="font-semibold">Testimonials</div>
          <form action={async (fd: FormData) => { "use server"; await addTestimonial(String(fd.get("name")), String(fd.get("quote")), fd.get("rating") ? Number(fd.get("rating")) : undefined); }} className="mt-4 grid gap-3">
            <input name="name" className="rounded-xl border px-3 py-2" placeholder="Name" required />
            <textarea name="quote" className="rounded-xl border px-3 py-2" placeholder="Quote" rows={3} required />
            <input name="rating" type="number" min={1} max={5} className="rounded-xl border px-3 py-2" placeholder="Rating (1-5, optional)" />
            <button className="rounded-2xl bg-zinc-900 text-white px-4 py-2 hover:opacity-90 w-fit" type="submit">Add testimonial</button>
          </form>

          <div className="mt-5 grid gap-3">
            {testimonials.map(t => (
              <div key={t.id} className="rounded-xl border p-4">
                <div className="font-medium">{t.name}{t.rating ? <span className="text-zinc-500 text-sm"> • {t.rating}/5</span> : null}</div>
                <div className="mt-1 text-sm text-zinc-600">{t.quote}</div>
                <form action={async () => { "use server"; await deleteTestimonial(t.id); }} className="mt-3">
                  <button className="rounded-xl border px-3 py-1 hover:bg-zinc-50 text-sm" type="submit">Delete</button>
                </form>
              </div>
            ))}
            {testimonials.length === 0 ? <div className="text-sm text-zinc-600">No testimonials yet.</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
