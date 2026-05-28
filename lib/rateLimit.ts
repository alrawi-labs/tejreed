/**
 * lib/rateLimit.ts
 *
 * Basit sliding-window rate limiter.
 * Vercel serverless'ta instance başına çalışır.
 * Yoğun trafik için Vercel KV / Upstash Redis önerilir.
 */

interface Window {
  count: number;
  reset: number; // Unix ms
}

const store = new Map<string, Window>();

// Periyodik temizlik (bellek sızıntısını önler)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    store.forEach((win, key) => {
      if (now > win.reset) store.delete(key);
    });
  }, 60_000);
}

export function rateLimit(
  key: string,
  limit: number = Number(process.env.RATE_LIMIT_PER_MINUTE ?? 5),
  windowMs: number = 60_000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  let win = store.get(key);

  if (!win || now > win.reset) {
    win = { count: 0, reset: now + windowMs };
    store.set(key, win);
  }

  win.count++;
  const allowed = win.count <= limit;
  return {
    allowed,
    remaining: Math.max(0, limit - win.count),
    resetAt: win.reset,
  };
}

/** Request'ten gerçek IP'yi güvenli şekilde çeker */
export function getClientIp(req: Request): string {
  // Vercel / proxy'nin eklediği başlıklar — öncelik sırasına göre
  const headers = [
    "x-real-ip",
    "x-forwarded-for",
    "cf-connecting-ip", // Cloudflare
  ];
  for (const h of headers) {
    const val = req.headers.get(h);
    if (val) return val.split(",")[0].trim();
  }
  return "unknown";
}