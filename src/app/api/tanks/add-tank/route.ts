import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const backendResponse = await fetch("http://10.8.0.39:6900/tanks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get("cookie") || "", // pass session cookie if exists
      },
      body: JSON.stringify(body),
    });

    const data = await backendResponse.json();

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Add tank error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
