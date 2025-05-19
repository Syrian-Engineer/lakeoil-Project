import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    const res = await fetch("http://78.189.54.28:6900/customers/get", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.get('cookie') || '',
      },
      body: JSON.stringify({ id }), // send body to backend as well
      credentials: "include",
    });

    const data = await res.json();
    return new NextResponse(JSON.stringify(data), { status: 200 });

  } catch (error) {
    console.error(error);
    return new NextResponse('Failed to fetch customer data', { status: 500 });
  }
}
