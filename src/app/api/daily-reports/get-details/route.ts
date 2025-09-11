import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    const access_token = req.headers.get("authorization");

    if (!id || !access_token) {
      return NextResponse.json(
        { error: "Missing ID or Authorization" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `http://central.oktin.ak4tek.com:3950/daily_report/${id}`,
      {
        headers: {
          Authorization: `${access_token}`,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch report from backend" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
