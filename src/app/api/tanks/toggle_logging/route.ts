import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const backendRes = await fetch("http://10.8.0.39:6900/toggle_logging", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get('cookie') || '',
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Toggle logging error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to toggle logging" },
      { status: 500 }
    );
  }
}
