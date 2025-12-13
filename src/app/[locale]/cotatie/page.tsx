"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function QuotePage() {
  const search = useSearchParams();
  const router = useRouter();

  // step=1 (default) sau step=2
  const step = useMemo(() => (search.get("step") === "2" ? 2 : 1), [search]);

  const goToStep2 = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("step", "2");
    router.replace(url.toString());
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Header simplu pe galben */}
      <header className="bg-amber-400">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Cerere Ofertă
          </h1>
          <p className="mt-1 text-sm font-medium">Crystal Logistics Services</p>
        </div>
      </header>

      {/* PASUL 1 */}
      {step === 1 && (
        <section className="w-full py-6">
          <div className="mx-auto max-w-6xl px-4 pb-4">
            <h2 className="text-lg font-semibold tracking-tight">
              Pasul 1 — Detalii Inițiale
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Completează formularul. După trimitere vei fi redirecționat
              automat la Pasul 2.
            </p>
          </div>

          <div className="w-full overflow-hidden bg-white">
            <iframe
              title="Cerere Ofertă — Pasul 1"
              src="https://forms.monday.com/forms/embed/e9cd00821c754b05fabf6a631199241f?r=euc1"
              className="block w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{
                height: "calc(100vh - 240px)",
                background: "transparent",
                border: "0",
                boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
              }}
              allow="clipboard-write; fullscreen"
            />
          </div>

          {/* Fallback în caz că redirectul rămâne în iframe */}
          <div className="mx-auto max-w-6xl px-4">
            <button
              onClick={goToStep2}
              className="mt-6 inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold shadow-sm hover:bg-neutral-50"
            >
              Am trimis, mergi la Pasul 2 →
            </button>
          </div>
        </section>
      )}

      {/* PASUL 2 */}
      {step === 2 && (
        <section className="w-full py-6">
          <div className="mx-auto max-w-6xl px-4 pb-4">
            <h2 className="text-lg font-semibold tracking-tight">
              Pasul 2 — Detalii Complementare
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Mulțumim! Completează și acest pas ca să finalizăm cererea.
            </p>
          </div>

          <div className="w-full overflow-hidden bg-white">
            <iframe
              title="Cerere Ofertă — Pasul 2"
              src="https://forms.monday.com/forms/embed/0f2fea8da985e1c5d7793b71af3a0161?r=euc1"
              className="block w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{
                height: "calc(100vh - 240px)",
                background: "transparent",
                border: "0",
                boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
              }}
              allow="clipboard-write; fullscreen"
            />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mx-auto max-w-5xl px-6 pb-12 text-center">
        <p className="text-sm text-neutral-500">
          Întrebări? Scrie-ne la{" "}
          <a
            href="mailto:logistics@crystal-logistics-services.com"
            className="underline"
          >
            logistics@crystal-logistics-services.com
          </a>
          .
        </p>
      </footer>
    </main>
  );
}
