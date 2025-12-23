// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token");

  // 🔹 Rotas públicas
  if (pathname.startsWith("/login") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // 🔹 Tentando acessar área protegida sem token
  if (!token && pathname.startsWith("/office")) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 🔹 Usuário logado tentando acessar login
  if (token && pathname === "/login") {
    const officeUrl = new URL("/office", request.url);
    return NextResponse.redirect(officeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/office/:path*", "/login"],
};
