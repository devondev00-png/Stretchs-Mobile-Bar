"use client";

import { useEffect, useState } from "react";

export function HCaptchaWidget() {
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!siteKey) return;
    const s = document.createElement("script");
    s.src = "https://js.hcaptcha.com/1/api.js";
    s.async = true;
    s.defer = true;
    s.onload = () => setReady(true);
    document.body.appendChild(s);
    return () => { try { document.body.removeChild(s); } catch {} };
  }, [siteKey]);

  if (!siteKey) return null;

  return (
    <div className="mt-2">
      <div className="text-sm font-medium">Spam protection</div>
      <div className="mt-2">
        <div className="h-captcha" data-sitekey={siteKey}></div>
      </div>
      {!ready ? <p className="mt-2 text-xs text-zinc-500">Loading captcha…</p> : null}
    </div>
  );
}
