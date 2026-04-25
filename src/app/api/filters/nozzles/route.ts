// // /app/api/filters/nozzles/route.ts
// export async function GET(req: Request) {

//     const accessToken = req.headers.get('Authorization');
//     const backendUrl = req.headers.get("x-backend-url");

//     if (!accessToken) {
//       return new Response(JSON.stringify({ error: 'Access token missing' }), { status: 401 });
//     }

//     if (!backendUrl) {
//       return NextResponse.json(
//         { error: "Backend not selected" },
//         { status: 400 }
//       );
//     }
  
//     try {
//       const res = await fetch(`${backendUrl}/station/nozzles`, {
//         headers: { Authorization: accessToken },
//       });
  
//       if (!res.ok) {
//         const error = await res.text();
//         console.error("Failed to fetch nozzles:", error);
//         return new Response(JSON.stringify({ error }), { status: res.status });
//       }
  
//       const nozzles = await res.json();
//       return new Response(JSON.stringify(nozzles), { status: 200 });
//     } catch (err: any) {
//       console.error("Error in nozzles route:", err.message || err);
//       return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
//     }
//   }
  

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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

  // ✅ HTTP-only allowed backends
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

  try {
    const res = await fetch(`${backendUrl}/station/nozzles`, {
      headers: {
        Authorization: accessToken,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Failed to fetch nozzles:", errorText);

      return NextResponse.json(
        { error: "Failed to fetch nozzles" },
        { status: res.status }
      );
    }

    const nozzles = await res.json();

    return NextResponse.json(nozzles, { status: 200 });
  } catch (err: any) {
    console.error("Error in nozzles route:", err.message || err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}