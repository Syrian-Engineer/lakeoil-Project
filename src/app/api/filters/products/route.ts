// // /app/api/filters/products/route.ts
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
//       const res = await fetch(`${backendUrl}/station/products`, {
//         headers: { Authorization: accessToken },
//       });
  
//       if (!res.ok) {
//         const error = await res.text();
//         console.error("Failed to fetch products:", error);
//         return new Response(JSON.stringify({ error }), { status: res.status });
//       }
  
//       const products = await res.json();
//       return new Response(JSON.stringify(products), { status: 200 });
//     } catch (err: any) {
//       console.error("Error in products route:", err.message || err);
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
  ];

  if (!allowedBackends.includes(backendUrl)) {
    return NextResponse.json(
      { error: "Invalid backend URL" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`${backendUrl}/station/products`, {
      headers: {
        Authorization: accessToken,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Failed to fetch products:", errorText);

      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: res.status }
      );
    }

    const products = await res.json();

    return NextResponse.json(products, { status: 200 });
  } catch (err: any) {
    console.error("Error in products route:", err.message || err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}