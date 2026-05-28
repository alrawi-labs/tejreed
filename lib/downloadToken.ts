/**
 * lib/downloadToken.ts
 *
 * HMAC-SHA256 ile imzalı, süreli indirme tokeni.
 * Yalnızca sunucu tarafında çalışır — client'a sızmaz.
 */
import crypto from "crypto";

function getSecret(): string {
  const s = process.env.DOWNLOAD_SECRET;
  if (!s || s.length < 32) {
    throw new Error("DOWNLOAD_SECRET eksik veya çok kısa (min 32 karakter).");
  }
  return s;
}

function getTTL(): number {
  return Number(process.env.TOKEN_TTL_SECONDS ?? 60);
}

/** Token payload — JSON olarak imzalanır */
interface Payload {
  fileId: string;
  exp: number;  // Unix timestamp (saniye)
  ip: string;
}

/** HMAC imzası üretir */
function sign(payload: Payload): string {
  const data = `${payload.fileId}|${payload.exp}|${payload.ip}`;
  return crypto
    .createHmac("sha256", getSecret())
    .update(data)
    .digest("base64url");
}

/** Token üretir — sunucu tarafında, sayaç bitince çağrılır */
export function createToken(fileId: string, ip: string): string {
  const exp = Math.floor(Date.now() / 1000) + getTTL();
  const payload: Payload = { fileId, exp, ip };
  const sig = sign(payload);
  const raw = JSON.stringify({ ...payload, sig });
  return Buffer.from(raw).toString("base64url");
}

export type VerifyResult =
  | { ok: true; fileId: string }
  | { ok: false; reason: "expired" | "invalid" | "ip_mismatch" };

/** Token doğrular — sunucu tarafında, indirme isteğinde çağrılır */
export function verifyToken(token: string, ip: string): VerifyResult {
  try {
    const raw = Buffer.from(token, "base64url").toString("utf8");
    const { fileId, exp, ip: tokenIp, sig } = JSON.parse(raw) as Payload & { sig: string };

    // 1. Tip kontrolü
    if (!fileId || !exp || !tokenIp || !sig) return { ok: false, reason: "invalid" };

    // 2. İmza doğrula (timing-safe compare)
    const expected = sign({ fileId, exp, ip: tokenIp });
    const sigBuf = Buffer.from(sig);
    const expBuf = Buffer.from(expected);
    if (
      sigBuf.length !== expBuf.length ||
      !crypto.timingSafeEqual(sigBuf, expBuf)
    ) {
      return { ok: false, reason: "invalid" };
    }

    // 3. Süre kontrolü
    if (Math.floor(Date.now() / 1000) > exp) {
      return { ok: false, reason: "expired" };
    }

    // 4. IP kontrolü
    if (tokenIp !== ip) {
      return { ok: false, reason: "ip_mismatch" };
    }

    return { ok: true, fileId };
  } catch {
    return { ok: false, reason: "invalid" };
  }
}