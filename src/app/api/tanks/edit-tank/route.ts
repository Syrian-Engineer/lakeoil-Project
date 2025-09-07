import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse JSON body from client
    const data = await req.json();

    // Forward to backend API
    const backendResponse = await fetch("http://central.oktin.ak4tek.com:3950/tanks/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get("cookie") || "", // forward session cookie if needed
      },
      body: JSON.stringify(data),
    });

    const backendData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { message: backendData.message || "Failed to update tank" },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(backendData);
  } catch (error) {
    console.error("Error in /api/tanks/edit-tank:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
