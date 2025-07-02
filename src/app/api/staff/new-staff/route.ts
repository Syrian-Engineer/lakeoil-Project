// File: /app/api/staff/new-staff/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch('http://10.8.0.39:6900/staff/add', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.get('cookie') || '',
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
