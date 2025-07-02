// /app/api/tanks/get-tanks/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const backendResponse = await fetch("http://10.8.0.39:6900/tanks/getall", {
      method: "GET",
      headers: {
        cookie: req.headers.get("cookie") || "", // forward session cookie
      },
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json({ message: data.message || "Failed to fetch tanks" }, { status: backendResponse.status });
    }

    return NextResponse.json({ tanks: data });
  } catch (err) {
    console.error("Error in /api/tanks/get-tanks:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
