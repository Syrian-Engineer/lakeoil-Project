import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
      const access_token = req.headers.get('Authorization');
  

  if (!access_token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const [tanksRes, stationsRes] = await Promise.all([
    fetch("http://central.oktin.ak4tek.com:3950/ak4tek/tanks/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: access_token,
      },
    }),
    fetch("http://central.oktin.ak4tek.com:3950/stationinfo/all", {
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
