type Bucket = { tokens: number; last: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, { tokens, windowMs }: { tokens: number; windowMs: number }) {
  const now = Date.now();
  const b = buckets.get(key) ?? { tokens, last: now };
  const elapsed = now - b.last;
  const refill = (elapsed / windowMs) * tokens;

  b.tokens = Math.min(tokens, b.tokens + refill);
  b.last = now;

  if (b.tokens < 1) {
    buckets.set(key, b);
    return { ok: false, remaining: 0 };
  }

  b.tokens -= 1;
  buckets.set(key, b);
  return { ok: true, remaining: Math.floor(b.tokens) };
}
