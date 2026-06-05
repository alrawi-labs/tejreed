import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.MUSIC_REMOVER_API_URL?.trim();

export async function POST(req: NextRequest) {
  if (!API_BASE) {
    return NextResponse.json({ error: "Sunucu yapılandırma hatası." }, { status: 500 });
  }

  const formData = await req.formData();

  const res = await fetch(`${API_BASE}/api/split-audio`, {
    method: "POST",
    body: formData,
    signal: AbortSignal.timeout(600_000),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    return NextResponse.json(err, { status: res.status });
  }

  const contentType = res.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const data = await res.json();
    return NextResponse.json(data);
  } else {
    // Audio blob
    const blob = await res.arrayBuffer();
    return new NextResponse(blob, {
      headers: { "Content-Type": contentType },
    });
  }
}