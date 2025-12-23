import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("franca_session");
  const { pathname } = req.nextUrl;

  const isAuthRoute = pathname.startsWith("/login");
  const isProtectedRoute = pathname.startsWith("/office");

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/office", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/office/:path*", "/login"],
};
