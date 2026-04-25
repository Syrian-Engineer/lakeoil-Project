// export async function GET(req: Request) {
//     try {
//       const accessToken = req.headers.get('Authorization');

//       const backendUrl = req.headers.get("x-backend-url");

//       if (!accessToken) {
//         return new Response(JSON.stringify({ error: 'Access token missing' }), {
//           status: 401,
//         });
//       }
      
//         if (!backendUrl) {
//         return NextResponse.json(
//           { error: "Backend not selected" },
//           { status: 400 }
//         );
//       }
//       const response = await fetch(`${backendUrl}/sales_reports/page?`, {
//         method: 'GET',
//         headers: {
//           Authorization: `${accessToken}`,
//         },
//       });
  
//       if (!response.ok) {
//         return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
//           status: response.status,
//         });
//       }
  
//       const data = await response.json();
//       return new Response(JSON.stringify(data), { status: 200 });
  
//     } catch (err) {
//       return new Response(JSON.stringify({ error: 'Server error' }), {
//         status: 500,
//       });
//     }
//   }
  


import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.headers.get("authorization");
    const backendUrl = req.headers.get("x-backend-url");

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access token missing" },
        { status: 401 }
      );
    }

    if (!backendUrl) {
      return NextResponse.json(
        { error: "Backend not selected" },
        { status: 400 }
      );
    }

    // 🔐 Optional but VERY important security validation
    const allowedBackends = [
      "http://192.168.8.224:3000",
      "http://central.oktin.ak4tek.com:3950",
      "http://server.taiba.ak4tek.com"
    ];

    if (!allowedBackends.includes(backendUrl)) {
      return NextResponse.json(
        { error: "Invalid backend URL" },
        { status: 400 }
      );
    }

    const response = await fetch(`${backendUrl}/sales_reports/page`, {
      method: "GET",
      headers: {
        Authorization: accessToken,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}