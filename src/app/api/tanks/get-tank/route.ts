// /app/api/tanks/get-tank/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Tank id is required" }, { status: 400 });
    }

    // Forward the request to your backend, passing id in body
    const backendResponse = await fetch("http://central.oktin.ak4tek.com:3950/tanks/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get("cookie") || "", // forward session cookie if needed
      },
      body: JSON.stringify({ id }),
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json({ message: data.message || "Failed to fetch tank" }, { status: backendResponse.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in /api/tanks/get-tank:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
