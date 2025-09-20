import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
      const access_token = req.headers.get('Authorization');
  

  if (!access_token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const [refillRecordsRes, autoRefillRecordsRes] = await Promise.all([
    fetch("http://central.oktin.ak4tek.com:3950/ak4tek/tanks/refill", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`,
      },
    }),
    fetch("http://central.oktin.ak4tek.com:3950/ak4tek/tanks/autorefill", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access_token}`,
      },
    }),
  ]);

  const refillRecordsResult = await refillRecordsRes.json();
  const autoRefillRecordsResult = await autoRefillRecordsRes.json();

  return NextResponse.json({
    refillRecords: refillRecordsResult.data.records || [],
    autoRefillRecords: autoRefillRecordsResult.data.records || [],
  });
}
