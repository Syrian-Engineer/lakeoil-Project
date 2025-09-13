import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch("http://central.oktin.ak4tek.com:3950/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    const accessToken = result?.data?.access_token;

    if (accessToken) {
      (await cookies()).set("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });
    }

    return NextResponse.json(result, { status: response.status });
  } catch (err: any) {
    console.error("Proxy login error:", err);
    return NextResponse.json(
      { message: "Proxy request failed" },
      { status: 500 }
    );
  }
}
