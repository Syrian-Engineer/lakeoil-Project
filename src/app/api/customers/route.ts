import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const accessToken = req.headers.get("authorization");
    const backendUrl = req.headers.get("x-backend-url");

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access token missing" },
        { status: 401 }
      );
    }

    if (!backendUrl) {
      return NextResponse.json(
        { error: "Backend not selected" },
        { status: 400 }
      );
    }

  try {
    const res = await fetch(`${backendUrl}/ak4tek/customers/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${accessToken}`
      },
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
