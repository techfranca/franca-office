import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("franca-office-session");

  // Rotas públicas
  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // Tentando acessar área protegida sem sessão
  if (!session && pathname.startsWith("/office")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Usuário logado tentando acessar login
  if (session && pathname === "/login") {
    return NextResponse.redirect(new URL("/office", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/office/:path*", "/login"],
};
