import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const { cookies } = req;
  let accessToken = cookies.get("accessToken")?.value;
  if (!accessToken && !req.nextUrl.pathname.startsWith("/auth/"))
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));

  if (accessToken && req.nextUrl.pathname.startsWith("/auth/")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
