// src/middleware.ts
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intl = createMiddleware(routing);

type AppLocale = (typeof routing.locales)[number];

function isLocale(value: string | undefined): value is AppLocale {
  if (!value) return false;
  return (routing.locales as readonly string[]).includes(value);
}


function splitLocale(pathname: string) {
  const first = pathname.split("/")[1];
  const hasLocale = isLocale(first);

  return {
    noLoc: hasLocale ? pathname.replace(`/${first}`, "") : pathname,
    loc: (hasLocale ? first : routing.defaultLocale) as AppLocale,
    hasLocale,
  };
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ignoră assets / next internals
  if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.includes(".")
  ) {
    return;
  }

  const { noLoc, loc, hasLocale } = splitLocale(pathname);


  if (
      noLoc.startsWith("/blog/") ||
      noLoc.startsWith("/stiri/")
  ) {
    const slug = noLoc.replace(/^\/(blog|stiri)\//, "");
    return NextResponse.redirect(
        new URL(`/${slug}`, req.url),
        301
    );
  }



  const res = intl(req);
  if (res.redirected) return res;


  if (noLoc.startsWith("/admin")) {
    const hasSession = Boolean(req.cookies.get("session")?.value);


    if (noLoc === "/admin/login") {
      if (hasSession) {
        return NextResponse.redirect(
            new URL(`/${loc}/admin/posts`, req.url)
        );
      }
      return res;
    }

    // restul /admin/* cere sesiune
    if (!hasSession) {
      return NextResponse.redirect(
          new URL(`/${loc}/admin/login`, req.url)
      );
    }
  }

  return res;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
