import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const { cookies } = req;

  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/")
  ) {
    return;
  }
  let locale = req.cookies.get("NEXT_LOCALE")?.value || "en";
  if (req.nextUrl.locale != locale) {
    //const locale = req.cookies.get("NEXT_LOCALE")?.value || "en";
    if (req.nextUrl.locale !== locale) {
      return NextResponse.redirect(
        new URL(
          `/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`,
          req.url
        )
      );
    }
  }

  let accessToken = cookies.get("accessToken")?.value;
  if (!accessToken && !req.nextUrl.pathname.includes("/auth/"))
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));

  if (
    accessToken &&
    (req.nextUrl.pathname.includes("/auth/") || req.nextUrl.pathname == "/")
  ) {
    return NextResponse.redirect(new URL("/recommended-books", req.url));
  }
}
