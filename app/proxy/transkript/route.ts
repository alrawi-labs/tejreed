import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiUrl = process.env.TRANSCRIPT_API_URL;
  const apiKey = process.env.TRANSCRIPT_API_KEY;

  if (!apiUrl || !apiKey) {
    return NextResponse.json({ detail: "Sunucu yapılandırma hatası." }, { status: 500 });
  }

  try {
    const formData = await req.formData();

    const res = await fetch(`${apiUrl}/transkript`, {
      method: "POST",
      headers: { "X-API-Key": apiKey },
      body: formData,
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });

  } catch (err) {
    return NextResponse.json({ detail: "Sunucu hatası." }, { status: 500 });
  }
}