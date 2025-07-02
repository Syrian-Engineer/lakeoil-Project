// app/api/proxy/deleteAlarmError/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { pump_code } = await req.json();
  
    const backendRes = await fetch(`http://10.8.0.39:6900/parameters/deleteerror`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.get('cookie') || '', // session forwarding
      },
      body: JSON.stringify({ pump_code }),
    });
  
    const data = await backendRes.json();
    return new NextResponse(JSON.stringify(data), {
      status: backendRes.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  