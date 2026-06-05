// app/api/transkript/route.ts
import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_URL = process.env.TRANSKRIPT_URL!;
const API_KEY      = process.env.TRANSKRIPT_API_KEY!;

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const res = await fetch(UPSTREAM_URL, {
    method: "POST",
    headers: { "X-API-Key": API_KEY },
    body: formData,
  });

  const data = await res.json().catch(() => ({ detail: "Parse error" }));
  return NextResponse.json(data, { status: res.status });
}