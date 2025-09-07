// /app/api/tanks/get-tanks/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const access_token = req.headers.get("Authorization")
    const backendResponse = await fetch("http://central.oktin.ak4tek.com:3950/ak4tek/tanks/all", {
      method: "POST",
      headers: {
        Authorization:`${access_token}`
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
