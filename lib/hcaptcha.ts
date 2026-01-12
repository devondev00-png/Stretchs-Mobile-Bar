export async function verifyHCaptcha(token: string | null, ip?: string | null) {
  const secret = process.env.HCAPTCHA_SECRET;
  if (!secret) return { ok: true, skipped: true }; // optional

  if (!token) return { ok: false, error: "Missing captcha token" };

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (ip) body.set("remoteip", ip);

  const res = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await res.json().catch(() => null);
  if (!data?.success) return { ok: false, error: "Captcha failed" };
  return { ok: true, skipped: false };
}
