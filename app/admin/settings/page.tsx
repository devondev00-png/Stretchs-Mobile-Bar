import { db } from "@/lib/db";
import { saveSettings } from "./actions";

export default async function AdminSettings() {
  const s = await db.siteSettings.findUnique({ where: { id: "singleton" } });

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold tracking-tight">Site settings</h1>

      <div className="rounded-2xl border bg-white p-6">
        <form action={saveSettings} className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Business name" name="businessName" defaultValue={s?.businessName ?? "Stretchs Mobile Bar"} />
            <Field label="Location tagline" name="location" defaultValue={s?.location ?? ""} placeholder="Limerick and surrounds" />
            <Field label="Phone" name="phone" defaultValue={s?.phone ?? ""} />
            <Field label="Email" name="email" defaultValue={s?.email ?? ""} />
            <Field label="Instagram handle" name="instagramHandle" defaultValue={s?.instagramHandle ?? "stretchs_mobile_bar"} />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Hero headline</label>
            <textarea name="heroHeadline" rows={2} className="rounded-xl border px-3 py-2" defaultValue={s?.heroHeadline ?? ""} />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Hero subheadline</label>
            <textarea name="heroSubheadline" rows={2} className="rounded-xl border px-3 py-2" defaultValue={s?.heroSubheadline ?? ""} />
          </div>

          <button className="rounded-2xl bg-zinc-900 text-white px-4 py-2 hover:opacity-90 w-fit" type="submit">
            Save settings
          </button>
        </form>
      </div>
    </div>
  );
}

function Field(props: any) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium">{props.label}</label>
      <input {...props} className="rounded-xl border px-3 py-2" />
    </div>
  );
}
