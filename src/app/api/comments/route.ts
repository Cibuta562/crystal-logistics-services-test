export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import "@/lib/firebase-admin";

const db = getFirestore();

export async function POST(req: Request) {
  const { slug, name, text } = await req.json();
  if (!slug || !text || text.length < 3)
    return new NextResponse("Invalid", { status: 400 });

  // very light rate-limit by IP (60s)
  const ip = (req.headers.get("x-forwarded-for") ?? "local")
    .split(",")[0]
    .trim();
  const rlRef = db.collection("_ratelimits").doc(`c_${ip}`);
  const rl = await rlRef.get();
  const now = Date.now();
  if (rl.exists && now - (rl.data()!.ts || 0) < 60_000) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }
  await rlRef.set({ ts: now }, { merge: true });

  await db
    .collection("posts")
    .doc(slug)
    .collection("comments")
    .add({
      name: (name || "Anonim").slice(0, 60),
      text: text.slice(0, 2000),
      createdAt: Timestamp.now(),
      approved: true, // poți adăuga moderare la nevoie
    });

  return NextResponse.json({ ok: true });
}
