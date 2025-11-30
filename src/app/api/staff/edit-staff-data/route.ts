import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const access_token = req.headers.get("Authorization")
    const body = await req.json();

    const response = await fetch('http://central.oktin.ak4tek.com:3950/auth/protected', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization : `${access_token}`,
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
