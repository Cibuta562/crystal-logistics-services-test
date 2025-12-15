// app/api/form-tracking/route.ts
import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

const SUPPORTED_LANGS = ["ro", "en", "de", "fr", "it", "pl"] as const;

function getLanding(pathname: string): string {
    if (!pathname) return "homepage";

    const clean = pathname.split(/[?#]/)[0];
    const parts = clean.split("/").filter(Boolean);

    if (parts.length === 0) return "homepage";

    // prima parte poate fi locale
    if (SUPPORTED_LANGS.includes(parts[0] as (typeof SUPPORTED_LANGS)[number])) {
        if (parts.length === 1) return "homepage";
        return parts[1];
    }

    return parts[0];
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        if (!data?.pageUrl) {
            return NextResponse.json({ error: "Missing pageUrl" }, { status: 400 });
        }

        const url = new URL(data.pageUrl);
        const landing = getLanding(url.pathname);

        const payload = {
            event: data.event ?? "form_intent",
            formType: data.formType ?? "unknown",
            language: data.language ?? "unknown",
            pageUrl: data.pageUrl,
            landing,
            processed: false,
            timestamp: new Date(), // Firestore îl va salva ca Timestamp
        };

        // INTENT-urile merg în form_tracking
        await adminDb.collection("form_tracking").add(payload);

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("TRACKING ERROR:", err);
        return NextResponse.json(
            { error: "tracking_failed", details: String(err) },
            { status: 500 }
        );
    }
}
