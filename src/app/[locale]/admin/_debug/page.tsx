"use client";

import { fbAuth } from "@/lib/firebase-client";
import { useEffect, useState } from "react";
import type { IdTokenResult } from "firebase/auth";

type Claims = Record<string, unknown> & { admin?: boolean };

type AdminDebugState = {
  email: string | null;
  uid: string;
  admin: boolean;
  claims: Claims;
  token: Pick<
    IdTokenResult,
    "authTime" | "issuedAtTime" | "expirationTime" | "signInProvider"
  >;
};

export default function AdminDebug() {
  const [state, setState] = useState<AdminDebugState | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const user = fbAuth.currentUser;
        if (!user) {
          if (!cancelled) setErr("Nu ești logat în Firebase (client).");
          return;
        }

        const t = await user.getIdTokenResult(true);
        const claims = t.claims as Claims;

        if (cancelled) return;

        setState({
          email: user.email,
          uid: user.uid,
          admin: claims.admin === true,
          claims,
          token: {
            authTime: t.authTime,
            issuedAtTime: t.issuedAtTime,
            expirationTime: t.expirationTime,
            signInProvider: t.signInProvider ?? null,
          },
        });
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Eroare";
        if (!cancelled) setErr(message);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (err) return <pre className="p-4 text-red-600">{err}</pre>;
  return <pre className="p-4">{JSON.stringify(state, null, 2)}</pre>;
}
