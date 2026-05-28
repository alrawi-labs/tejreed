/**
 * app/api/token/route.ts
 *
 * Sayaç bitince client bu endpoint'i çağırır.
 * Sunucu imzalı bir token döner — indirme URL'si asla client'a gitmiyor.
 */
import { NextResponse } from "next/server";
import { createToken } from "@/lib/downloadToken";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

/** Dosya ID → gerçek URL haritası — yalnızca sunucuda */
function getFileUrl(fileId: string): string | null {
  // .env.local'deki FILE_<ID> değişkenlerini okur
  const envKey = `FILE_${fileId}`;
  const url = process.env[envKey];
  return url ?? null;
}

function getAllowedOrigin(): string {
  return process.env.ALLOWED_ORIGIN ?? "";
}

export async function GET(req: Request) {
  // 1. Origin kontrolü
  const origin = req.headers.get("origin") ?? "";
  const allowed = getAllowedOrigin();
  if (allowed && origin !== allowed) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 2. Rate limiting
  const ip = getClientIp(req);
  const rl = rateLimit(`token:${ip}`);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Çok fazla istek. Biraz bekle." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  // 3. fileId parametresi
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("fileId")?.trim();

  if (!fileId || !/^[a-zA-Z0-9_-]{1,64}$/.test(fileId)) {
    return NextResponse.json({ error: "Geçersiz fileId." }, { status: 400 });
  }

  // 4. Dosya var mı?
  const fileUrl = getFileUrl(fileId);
  if (!fileUrl) {
    return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 404 });
  }

  // 5. Token üret
  const token = createToken(fileId, ip);

  return NextResponse.json(
    { token },
    {
      headers: {
        "Cache-Control": "no-store",
        ...(allowed ? { "Access-Control-Allow-Origin": allowed } : {}),
      },
    }
  );
}

export async function OPTIONS(req: Request) {
  const allowed = getAllowedOrigin();
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowed,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}