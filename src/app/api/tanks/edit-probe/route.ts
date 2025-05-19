// File: /app/api/tanks/edit-probe/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Read the JSON body
    const body = await req.json();

    // Forward the request to the backend server
    const response = await fetch("http://78.189.54.28:6900/probes/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get("cookie") || "", // pass cookies if your backend uses session cookies
      },
      body: JSON.stringify(body),
    });

    const data = await response.text();

    if (!response.ok) {
      return new NextResponse(data, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error editing probe:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
