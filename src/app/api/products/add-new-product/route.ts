import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const access_token = req.headers.get('Authorization');
    const backendUrl = req.headers.get("x-backend-url");

  if (!backendUrl) {
    return NextResponse.json({ error: "Backend not selected" }, { status: 400 });
  }

  if (!access_token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const response = await fetch(`${backendUrl}/product/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error in /api/products/add-new-product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
