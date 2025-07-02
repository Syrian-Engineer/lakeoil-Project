import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const res = await fetch('http://10.8.0.39:6900/alarms/getall', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.get("cookie") || "", // session forwarding
      },
      credentials:"include"
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch alarms' }, { status: res.status });
    }

    const result = await res.json();
    const alarms = result?.data?.page_records || [];

    return NextResponse.json({ alarms });
  } catch (error) {
    console.error('Error fetching alarms:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
