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


  try {
    const body = await req.json();
    const shiftPeriod = body.shift_period;
    const stationSerial = body.station_serial;

    if (!shiftPeriod) {
      return NextResponse.json(
        { error: "Missing shift_period" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${backendUrl}/sales_reports/periodic/current_day`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({
          shift_period: shiftPeriod,
          station_serial: stationSerial,
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error: any) {
    console.error("Error in current day route:", error?.message || error);

    return NextResponse.json(
      { error: "Upstream request failed" },
      { status: 500 }
    );
  }
}