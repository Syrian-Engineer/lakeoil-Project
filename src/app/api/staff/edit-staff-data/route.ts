import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const access_token = req.headers.get("Authorization")

    const body = await req.json();

    const response = await fetch(`http://central.oktin.ak4tek.com:3950/auth/protected`, {
      method: 'PUT',
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
      { message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
