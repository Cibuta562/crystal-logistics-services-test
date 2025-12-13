// app/api/monday-webhooks/route.ts
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

export const runtime = "nodejs";

type MondayWebhookBody = {
  challenge?: string;
  event?: {
    userId?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

type TrackingDoc = {
  processed?: boolean;
  timestamp?: unknown; // Firestore timestamp / Date / string - nu ne bazăm pe tip aici
  formType?: string;
  landing?: string;
  language?: string;
  pageUrl?: string;
  [key: string]: unknown;
};

export async function POST(req: Request) {
  try {
    const db = adminDb;
    const body = (await req.json()) as MondayWebhookBody;

    console.log("Monday webhook received:", JSON.stringify(body, null, 2));

    // Handshake Monday (prima dată când configurezi webhook-ul)
    if (body.challenge) {
      return NextResponse.json({ challenge: body.challenge });
    }

    const event = body.event;
    if (!event) {
      return NextResponse.json(
        { message: "No event in payload" },
        { status: 400 }
      );
    }

    // Monday “form submission” events au de obicei userId = -6
    const isFromForm = event.userId === -6;
    if (!isFromForm) {
      console.log(
        "Webhook event is not from a form, still recording for debug."
      );
    }

    // 1) Caută ultimul form_intent neprocesat
    let trackingData: TrackingDoc | null = null;

    const snap = await db
      .collection("form_tracking")
      .where("processed", "==", false)
      .orderBy("timestamp", "desc")
      .limit(1)
      .get();

    if (!snap.empty) {
      const doc = snap.docs[0];
      trackingData = doc.data() as TrackingDoc;
      await doc.ref.update({ processed: true });
    }

    // 2) Construiește documentul final de submission
    const formType = trackingData?.formType ?? "contact/newsletter";
    const landing = trackingData?.landing ?? "contact";
    const language = trackingData?.language ?? "unknown";
    const pageUrl = trackingData?.pageUrl ?? "unknown";

    const submission = {
      event: "form_submission" as const,
      formType,
      landing,
      language,
      pageUrl,
      processed: false,
      timestamp: Timestamp.now(), // <- Firestore Timestamp (corect pt admin SDK)
      mondayEvent: event, // raw payload pentru debugging
    };

    // 3) SUBMIT-urile finale merg în form_submissions
    await db.collection("form_submissions").add(submission);

    console.log("Saved to Firestore → form_submissions:", submission);

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message:
      "This endpoint only accepts POST requests from Monday.com webhooks.",
  });
}
