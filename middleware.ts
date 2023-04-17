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
  let forceRedirect = false;
  if (!req.cookies.get("NEXT_LOCALE")) {
    req.cookies.set("NEXT_LOCALE", "en");
    locale = "en";
    forceRedirect = true;
  }

  if (req.nextUrl.locale !== locale || forceRedirect) {
    const response = NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    );
    response.cookies.set("NEXT_LOCALE", locale);
    return response;
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
