import { NextResponse } from "next/server";

export async function POST() {
  // Clear the cookie
  const res = NextResponse.json({ message: "Logged out" });

  // Set cookie to expire immediately
  res.cookies.set("access_token", "", {
    path: "/",
    maxAge: 0, // expire immediately
    httpOnly: true,
    sameSite: "lax",
  });

  return res;
}