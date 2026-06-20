import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const access_token = req.headers.get('Authorization');
  const backendUrl = req.headers.get("x-backend-url");
  const region_name = req.headers.get("region_name");

  if (!backendUrl) {
    return NextResponse.json({ error: "Backend not selected" }, { status: 400 });
  }

  if (!access_token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!region_name) {
    return NextResponse.json({ error: "Region name missing" }, { status: 400 });
  }

  try {
    const response = await fetch(`${backendUrl}/regionprice/get?region_name=${region_name}`, {
      method: "GET",
      headers: {
        Authorization: access_token,
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error in /api/regionprices/get-regionprice-by-name:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
