export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { cookies } from "next/headers";
import "@/lib/firebase-admin";

export async function POST(req: Request) {
  const { idToken } = await req.json();

  const decoded = await getAuth().verifyIdToken(idToken, true);
  if (decoded.admin !== true)
    return new NextResponse("Forbidden", { status: 403 });

  const expiresIn = 1000 * 60 * 60 * 24 * 7;
  const sessionCookie = await getAuth().createSessionCookie(idToken, {
    expiresIn,
  });

  const cookieStore = await cookies(); // 👈 await
  cookieStore.set("session", sessionCookie, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: expiresIn / 1000,
  });

  return NextResponse.json({ ok: true });
}
