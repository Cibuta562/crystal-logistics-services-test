// src/lib/firebase-admin.ts
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL!;
const privateKey = process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n");

// Asigură-te că inițializezi aplicația DOAR o dată (Next.js poate re-rula modulele)
const firebaseAdminApp =
    getApps().length === 0
        ? initializeApp({
            credential: cert({ projectId, clientEmail, privateKey }),
        })
        : getApps()[0];

export const adminDb = getFirestore(firebaseAdminApp);