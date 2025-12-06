import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const access_token = req.headers.get("Authorization");

    // Get the user_id from query params
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json(
        { message: "Missing user_id" },
        { status: 400 }
      );
    }

    // Forward request to your backend API
    const response = await fetch(
      `http://central.oktin.ak4tek.com:3950/auth/protected?user_id=${user_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${access_token}`,
        },
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });

  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
