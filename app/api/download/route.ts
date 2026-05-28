/**
 * app/api/download/route.ts
 *
 * Token doğrular → dosyayı 302 ile yönlendirir.
 * Token: /api/token endpoint'inden alınır.
 */
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/downloadToken";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

function getFileUrl(fileId: string): string | null {
  const url = process.env[`FILE_${fileId}`];
  return url ?? null;
}

function getAllowedOrigin(): string {
  return process.env.ALLOWED_ORIGIN ?? "";
}

export async function GET(req: Request) {
  // 1. Origin kontrolü
  const origin = req.headers.get("origin") ?? "";
  const referer = req.headers.get("referer") ?? "";
  const allowed = getAllowedOrigin();

  // Referer yoksa direkt tarayıcı isteği — izin ver (a.click() referer göndermez)
  // Ama origin varsa ve yanlışsa reddet
  if (allowed && origin && origin !== allowed) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 2. Rate limiting (indirme isteği başına)
  const ip = getClientIp(req);
  const rl = rateLimit(`download:${ip}`, 10); // 10 indirme/dk
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Çok fazla istek. Biraz bekleyin." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

  // 3. Token parametresi
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token")?.trim();

  if (!token) {
    return NextResponse.json({ error: "Token eksik." }, { status: 400 });
  }

  // 4. Token doğrula
  const result = verifyToken(token, ip);

  if (!result.ok) {
    const messages: Record<typeof result.reason, string> = {
      expired:    "Token süresi dolmuş. Lütfen tekrar indirmeyi başlatın.",
      invalid:    "Geçersiz token.",
      ip_mismatch: "Güvenlik hatası. Lütfen tekrar deneyin.",
    };
    return NextResponse.json(
      { error: messages[result.reason] },
      { status: 401 }
    );
  }

  // 5. Dosya URL'si
  const fileUrl = getFileUrl(result.fileId);
  if (!fileUrl) {
    return NextResponse.json({ error: "Dosya bulunamadı." }, { status: 404 });
  }

  // 6. URL güvenlik kontrolü — sadece https:// izin ver
  try {
    const parsed = new URL(fileUrl);
    if (parsed.protocol !== "https:") {
      throw new Error("Güvensiz protokol");
    }
  } catch {
    return NextResponse.json({ error: "Geçersiz dosya URL'si." }, { status: 500 });
  }

  // 7. 302 Redirect
  return NextResponse.redirect(fileUrl, {
    status: 302,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}

// Token sistemi GET ile çalışır (a.href assign veya fetch)
// POST destekleme — OPTIONS CORS için
export async function OPTIONS() {
  const allowed = getAllowedOrigin();
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": allowed || "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}