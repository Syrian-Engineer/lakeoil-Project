// File: /app/api/staff/new-staff/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const access_token = req.headers.get("Authorization")
    const body = await req.json();

    const response = await fetch('http://central.oktin.ak4tek.com:3950/auth/newuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization : `${access_token}`,
      },
      
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
