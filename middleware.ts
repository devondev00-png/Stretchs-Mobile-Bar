import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname.startsWith("/admin/signin")) return NextResponse.next();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/signin";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Optional allowlist check for extra safety
  const allow = (process.env.ADMIN_ALLOWLIST_EMAILS || "").split(",").map(s => s.trim()).filter(Boolean);
  const email = (token.email as string | undefined) || "";
  if (allow.length > 0 && email && !allow.includes(email)) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/signin";
    url.searchParams.set("error", "not_allowed");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
