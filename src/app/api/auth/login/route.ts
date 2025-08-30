import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch("http://78.189.54.28:2500/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (err: any) {
    console.error("Proxy login error:", err);
    return NextResponse.json(
      { message: "Proxy request failed" },
      { status: 500 }
    );
  }
}
