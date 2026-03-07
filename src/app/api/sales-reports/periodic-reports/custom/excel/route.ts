import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const backendUrl = req.headers.get("x-backend-url");
  const token = req.headers.get("authorization");

  if (!backendUrl) {
    return NextResponse.json(
      { error: "Backend not selected" },
      { status: 400 }
    );
  }

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();

    const { start_date, end_date, station_serial } = body;

    if (!start_date || !end_date) {
      return NextResponse.json(
        { error: "Missing since_date or to_date" },
        { status: 400 }
      );
    }

    const backendResponse = await fetch(
      `${backendUrl}/sales_reports/periodic/custom/download`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          Accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        body: JSON.stringify({
          start_date,
          end_date,
          station_serial,
        }),
      }
    );

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      return NextResponse.json(
        { message: "Backend error", detail: errorText },
        { status: backendResponse.status }
      );
    }

    const blob = await backendResponse.blob();

    return new NextResponse(blob, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=custom-report.xlsx`,
      },
    });
  } catch (error) {
    console.error("Custom Excel Route Error:", error);

    return NextResponse.json(
      { message: "Failed to generate Excel file" },
      { status: 500 }
    );
  }
}