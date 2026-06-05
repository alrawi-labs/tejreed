import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.MUSIC_REMOVER_API_URL?.trim();

export async function POST(req: NextRequest) {
  if (!API_BASE) {
    return NextResponse.json({ error: "Sunucu yapılandırma hatası." }, { status: 500 });
  }

  const formData = await req.formData();

  const res = await fetch(`${API_BASE}/api/process-youtube`, {
    method: "POST",
    body: formData,
    signal: AbortSignal.timeout(600_000),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "youtube_blocked" }, { status: res.status });
  }

  const contentType = res.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return NextResponse.json(await res.json());
  } else {
    const blob = await res.arrayBuffer();
    return new NextResponse(blob, {
      headers: { "Content-Type": contentType },
    });
  }
}