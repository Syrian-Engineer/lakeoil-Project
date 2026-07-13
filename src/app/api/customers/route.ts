import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get("Authorization");
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
        Authorization: accessToken,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch customers" },
        { status: res.status }
      );
    }

    const data = await res.json();

    // data.data is an array
    if (!Array.isArray(data.data) || data.data.length === 0) {
      return NextResponse.json(
        {
          data: [],
          count: 0,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching customers:", err);

    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}