import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const accessToken = req.headers.get("authorization");
  const backendUrl = req.headers.get("x-backend-url");

  if (!accessToken) {
    return NextResponse.json(
      { error: "Access Token Missing" },
      { status: 401 }
    );
  }

  if (!backendUrl) {
    return NextResponse.json(
      { error: "Backend not selected" },
      { status: 400 }
    );
  }

  const allowedBackends = [
    "http://192.168.8.224:3000",
    "http://central.oktin.ak4tek.com:3950",
  ];

  if (!allowedBackends.includes(backendUrl)) {
    return NextResponse.json(
      { error: "Invalid backend URL" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    const sinceDate = body.start_date;
    const toDate = body.end_date;
    const stationSerial = body.station_serial;

    if (!sinceDate || !toDate) {
      return NextResponse.json(
        { error: "Missing since_date or to_date" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${backendUrl}/sales_reports/periodic/custom`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({
          since_date: sinceDate,
          to_date: toDate,
          station_serial: stationSerial,
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error: any) {
    console.error("Error in custom report route:", error?.message || error);

    return NextResponse.json(
      { error: "Upstream request failed" },
      { status: 500 }
    );
  }
}