// app/api/proxy/pumps/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const res = await fetch('http://10.8.0.39:6900/pumps/getall', {
      headers: {
        cookie: req.headers.get('cookie') || '', // pass along the session cookie
      },
      credentials: 'include',
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Proxy fetch error:', error);
    return new NextResponse('Failed to fetch pumps', { status: 500 });
  }
}
