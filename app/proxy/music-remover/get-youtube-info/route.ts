import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.MUSIC_REMOVER_API_URL?.trim();

export async function POST(req: NextRequest) {
  if (!API_BASE) return NextResponse.json({}, { status: 500 });

  const formData = await req.formData();
  const res = await fetch(`${API_BASE}/api/get-youtube-info`, {
    method: "POST",
    body: formData,
  });

  return NextResponse.json(await res.json(), { status: res.status });
}