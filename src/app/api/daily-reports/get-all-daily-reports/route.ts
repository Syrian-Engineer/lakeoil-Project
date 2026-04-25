import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const start_date = searchParams.get("start_date");
    const end_date = searchParams.get("end_date");
    const per_page = searchParams.get("per_page");
    const page = searchParams.get("page");
    const station = searchParams.get("station");


    const access_token = req.headers.get("authorization");
    const backendUrl = req.headers.get("x-backend-url")

    if (!access_token) {
      return NextResponse.json({ error: "Missing access token" }, { status: 401 });
    }

    if (!backendUrl) {
      return NextResponse.json({ error: "BackEnd Is Not Selected" }, { status: 401 });
    }

    const encodedStart = encodeURIComponent(start_date || "");
    const encodedEnd = encodeURIComponent(end_date || "");

    const externalResponse = await fetch(
      `${backendUrl}/daily_report?start_date=${encodedStart}&end_date=${encodedEnd}&per_page=${per_page}&page=${page}&EWURALicenseNo=${station}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
      }
    );

    if (!externalResponse.ok) {
      return NextResponse.json(
        { error: `External API failed (${externalResponse.status})` },
        { status: externalResponse.status }
      );
    }

    const data = await externalResponse.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching daily reports:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
