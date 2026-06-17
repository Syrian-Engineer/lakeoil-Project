import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest) {
    const access_token = req.headers.get('Authorization');
    const backendUrl = req.headers.get("x-backend-url");
  const productId = req.nextUrl.searchParams.get("id");

  if (!backendUrl) {
    return NextResponse.json({ error: "Backend not selected" }, { status: 400 });
  }

  if (!access_token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!productId) {
    return NextResponse.json({ error: "Product ID missing" }, { status: 400 });
  }

  try {
    const response = await fetch(`${backendUrl}/product/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: access_token,
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Error in /api/products/delete-product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
