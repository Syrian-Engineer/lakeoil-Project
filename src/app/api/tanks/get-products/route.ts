

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const backendUrl = req.cookies.get("backend_url")?.value || req.headers.get("x-backend-url");

    if (!backendUrl) {
      return NextResponse.json(
        { error: "Backend not selected" },
        { status: 400 }
      );
    }

    const backendResponse = await fetch(`${backendUrl}/ak4te/products/getall`, {
      method: "GET",
      headers: {
        cookie: req.headers.get("cookie") || "", // forward session cookie
      },
    });

    const data = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json({ message: data.message || "Failed to fetch products" }, { status: backendResponse.status });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error in /api/tanks/get-products:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
