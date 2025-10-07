import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const access_token = request.headers.get("Authorization");
    const { searchParams } = new URL(request.url);

    const EWURALicenseNo = searchParams.get("EWURALicenseNo") || "";
    const start_date = searchParams.get("start_date") || "";

    if (!access_token) {
      return NextResponse.json(
        { error: "Missing Authorization token" },
        { status: 401 }
      );
    }

    const apiUrl = `http://central.oktin.ak4tek.com:3950/daily_report?start_date=${start_date}&EWURALicenseNo=${EWURALicenseNo}`;

    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `${access_token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `External API error: ${text}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching daily reports:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
