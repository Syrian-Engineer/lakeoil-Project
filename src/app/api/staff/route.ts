import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch("http://central.oktin.ak4tek.com:3950/auth/protected", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: req.headers.get("cookie") || "", // session forwarding
      },
      credentials: "include",
    });
    
    const data = await res.json();
    
    if (!data?.data?.page_records) {
        console.error('Missing page_records:', data);
        return new NextResponse("Invalid response format", { status: 500 });
      }
    // ✅ Return proper JSON response using NextResponse.json
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching customers:", err);
    return new NextResponse("Failed to fetch customers", { status: 500 });
  }
}
