"use client";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { fbDb } from "@/lib/firebase-client";

function getLanding(pathname: string) {
    if (!pathname) return "homepage";

    const clean = pathname.split(/[?#]/)[0];
    const parts = clean.split("/").filter(Boolean); // "/" → []

    // root → homepage
    if (parts.length === 0) return "homepage";

    const langs = ["ro", "en", "fr", "de", "it", "es"];

    // /ro → homepage
    if (langs.includes(parts[0])) {
        if (parts.length === 1) return "homepage";
        // /ro/contact → contact
        return parts[1];
    }

    // fără limbă în URL
    return parts[0];
}

export async function trackFormSubmission(formType: string, language: string) {
    try {
        const rawUrl = window.location.href;
        const url = new URL(rawUrl);

        const landing = getLanding(url.pathname);

        const payload = {
            event: "form_completat",
            formType,
            language,
            pageUrl: rawUrl,
            landing,           // 👈 SINGURUL PAGE FIELD DE CARE AI NEVOIE
            processed: false,
            timestamp: serverTimestamp(),
        };

        console.log("🔥 SENDING PAYLOAD TO FIREBASE:", payload);

        await addDoc(collection(fbDb, "form_submissions"), payload);

    } catch (err) {
        console.error("❌ Error tracking form submission:", err);
    }
}
