"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { fbAuth } from "@/lib/firebase-client";
import { signInWithEmailAndPassword } from "firebase/auth";

function getAuthErrorMessage(e: unknown): string {
  const code =
    typeof e === "object" && e !== null && "code" in e
      ? (e as { code?: unknown }).code
      : undefined;

  const message =
    e instanceof Error ? e.message : typeof e === "string" ? e : "";

  const raw = String(code ?? message ?? "");

  if (raw.includes("auth/invalid-credential"))
    return "Email sau parolă incorecte.";
  if (raw.includes("auth/user-disabled")) return "Contul este dezactivat.";
  if (raw.includes("auth/too-many-requests"))
    return "Prea multe încercări. Încearcă din nou mai târziu.";
  if (raw.includes("auth/network-request-failed"))
    return "Eroare de rețea. Verifică conexiunea și încearcă din nou.";

  return message || "Eroare la autentificare.";
}

export default function LoginPage() {
  const router = useRouter();
  const locale = useLocale();

  const [isPending, start] = useTransition();
  const [err, setErr] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = useMemo(() => {
    if (isPending) return false;
    if (!email.trim()) return false;
    if (!password) return false;
    return true;
  }, [email, password, isPending]);

  async function establishSession(idToken: string) {
    const res = await fetch("/api/session/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ idToken }),
    });
    if (!res.ok) throw new Error(await res.text());
  }

  function toAdmin() {
    start(() => router.replace(`/${locale}/admin/posts`));
  }

  async function loginWithEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;

    setErr(null);

    try {
      const cred = await signInWithEmailAndPassword(
        fbAuth,
        email.trim(),
        password
      );
      const idToken = await cred.user.getIdToken(true);
      await establishSession(idToken);
      toAdmin();
    } catch (e: unknown) {
      setErr(getAuthErrorMessage(e));
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-neutral-950 px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur sm:p-8">
          <header className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Admin Login
            </h1>
            <p className="text-sm text-white/70">
              Autentificare doar pentru utilizatori cu rol de admin.
            </p>
          </header>

          <form onSubmit={loginWithEmail} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-white/80">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="username"
                inputMode="email"
                className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none ring-0 placeholder:text-white/30 focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@exemplu.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-white/80">
                Parolă
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none ring-0 placeholder:text-white/30 focus:border-yellow-400/60 focus:ring-2 focus:ring-yellow-400/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {err && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl bg-yellow-400 px-4 text-sm font-semibold text-black transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Se autentifică..." : "Intră"}
            </button>

            <p className="pt-2 text-center text-xs text-white/40">
              Dacă nu ai acces, contactează administratorul site-ului.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
