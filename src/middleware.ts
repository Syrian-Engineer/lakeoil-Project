import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith("/signin");

  // ❌ Not logged in → redirect to signin
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // ✅ Logged in → prevent going back to signin
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/reports", request.url));
  }

  return NextResponse.next();
}



export const config = {
  matcher: [
    "/reports/:path*",
    "/reports/preodic-reports/:path*",
    "/",
    "/daily-reports/:path*",
    "/station/:path*",
    "/customers/:path*",
    "/settings/:path*",
    "/staff/:path*",
    "/tanks/:path*",
  ],
};


