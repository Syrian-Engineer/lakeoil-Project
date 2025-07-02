import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch('http://10.8.0.39:6900/staff/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.get('cookie') || '',
      },
      body: JSON.stringify(body),
    });

    // Try to ensure the response is actually JSON
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const text = await response.text(); // read raw HTML
      throw new Error(`Expected JSON but got:\n\n${text}`);
    }

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
