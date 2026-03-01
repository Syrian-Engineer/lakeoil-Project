import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
      const access_token = req.headers.get('Authorization');
      const backendUrl = req.headers.get("x-backend-url");

  if (!access_token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

    if (!backendUrl) {
    return NextResponse.json(
      { error: "Backend not selected" },
      { status: 400 }
    );
  }

  const [tanksRes, stationsRes] = await Promise.all([
    fetch(`${backendUrl}/ak4tek/tanks/all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
    }),
    fetch(`${backendUrl}/stationinfo/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
    }),
  ]);

  const tanksResult = await tanksRes.json();
  const stationsResult = await stationsRes.json();

  return NextResponse.json({
    tanks: tanksResult.data || [],
    stations: stationsResult.data || [],
  });
}
