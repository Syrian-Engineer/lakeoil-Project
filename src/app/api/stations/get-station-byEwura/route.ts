import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const access_Token = req.headers.get("Authorization");
    const body = await req.json();

    const response = await fetch("http://central.oktin.ak4tek.com:3950/stationinfo/info", {
      method: "POST",
      headers: {  
        "Content-Type": "application/json",
        Authorization: `${access_Token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 400) {
        return NextResponse.json(
          { message: "Invalid request" },
          { status: 400 }
        );
      } else if (response.status === 404) {
        return NextResponse.json(
          { message: "Station not found" },
          { status: 404 }
        );
      } else {
        return NextResponse.json(
          { message: "Unexpected error occurred" },
          { status: response.status }
        );
      }
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
