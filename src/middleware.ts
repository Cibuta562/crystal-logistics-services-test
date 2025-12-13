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

// helper: scoate prefixul de locale din pathname
function splitLocale(pathname: string) {
  const first = pathname.split("/")[1];
  const hasLocale = isLocale(first);

  return {
    noLoc: hasLocale ? pathname.replace(`/${first}`, "") : pathname,
    loc: (hasLocale ? first : routing.defaultLocale) as AppLocale,
  };
}

export default function middleware(req: NextRequest) {
  // rulează mai întâi i18n (detectează/normalizează locale)
  const res = intl(req);
  if (res.redirected) return res;

  const { pathname } = req.nextUrl;
  const { noLoc, loc } = splitLocale(pathname);

  // tot ce e în /admin/* trece prin guard
  if (noLoc.startsWith("/admin")) {
    const hasSession = Boolean(req.cookies.get("session")?.value);

    // 1) /admin/login este accesibil public
    if (noLoc === "/admin/login") {
      // dacă are deja sesiune, du-l direct în dashboard
      if (hasSession) {
        return NextResponse.redirect(new URL(`/${loc}/admin/posts`, req.url));
      }
      return res;
    }

    // 2) orice alt /admin/* cere sesiune
    if (!hasSession) {
      return NextResponse.redirect(new URL(`/${loc}/admin/login`, req.url));
    }
  }

  return res;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
