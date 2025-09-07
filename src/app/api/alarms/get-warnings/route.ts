import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const res = await fetch('http://central.oktin.ak4tek.com:3950/warnings/getall', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.get("cookie") || "", // session forwarding
      },
      credentials:"include"
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch warnings' }, { status: res.status });
    }

    const result = await res.json();
    const warnings = result?.data?.page_records || [];

    return NextResponse.json({ warnings });
  } catch (error) {
    console.error('Error fetching warnings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
