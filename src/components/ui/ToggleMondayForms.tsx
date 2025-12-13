"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FileText, UserPlus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

type Tab = "offer" | "carrier";
type Locale = "ro" | "en";

const FORMS: Record<Locale, Record<Tab, string>> = {
  ro: {
    offer:
      "https://forms.monday.com/forms/embed/d822b77b6d1ae8edf0cc2c81a9989ce9?r=euc1",
    carrier:
      "https://forms.monday.com/forms/embed/33530d1ca8fa8be92c533ad00330ae50?r=euc1",
  },
  en: {
    offer:
      "https://forms.monday.com/forms/embed/0dd269a68887c5ca2de17dd4dead0648?r=euc1",
    carrier:
      "https://forms.monday.com/forms/embed/5d82441f01f78db40ef1c0f9da081bfe?r=euc1",
  },
};

export default function ToggleMondayForms() {
  const localeRaw = useLocale();
  const locale: Locale = localeRaw === "ro" ? "ro" : "en";
  const t = useTranslations("contactForms");

  const [tab, setTab] = useState<Tab>("offer");
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const src = useMemo(() => FORMS[locale][tab], [locale, tab]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    setLoading(true);
    iframe.src = src;
  }, [src]);

  return (
    <section className="bg-neutral-900 text-white py-20">
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        {/* === TOGGLE BUTTONS === */}
        <div className="flex w-full rounded-xl border border-white/10 overflow-hidden mb-10">
          <button
            type="button"
            onClick={() => setTab("offer")}
            className={`flex-1 px-5 py-3 text-sm md:text-base font-semibold transition ${
              tab === "offer"
                ? "bg-yellow-400 text-black"
                : "hover:bg-white/10 text-white/80"
            }`}
          >
            <span className="inline-flex items-center gap-2 justify-center">
              <FileText className="h-4 w-4" />
              {t("offerButton")}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setTab("carrier")}
            className={`flex-1 px-5 py-3 text-sm md:text-base font-semibold transition ${
              tab === "carrier"
                ? "bg-yellow-400 text-black"
                : "hover:bg-white/10 text-white/80"
            }`}
          >
            <span className="inline-flex items-center gap-2 justify-center">
              <UserPlus className="h-4 w-4" />
              {t("carrierButton")}
            </span>
          </button>
        </div>

        {/* === FORM + LOADER === */}
        <div className="relative rounded-2xl border border-white/10 bg-neutral-950 overflow-hidden shadow-xl min-h-[600px]">
          {/* LOADING OVERLAY */}
          {loading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white">
              <div className="h-10 w-10 rounded-full border-4 border-neutral-200 border-t-yellow-500 animate-spin" />
              <p className="mt-4 text-neutral-700 text-sm md:text-base">
                {t("loadingForm")}
              </p>
              <div className="mt-2 flex gap-1">
                <span className="h-2 w-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.2s]" />
                <span className="h-2 w-2 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.1s]" />
                <span className="h-2 w-2 bg-yellow-500 rounded-full animate-bounce" />
              </div>
            </div>
          )}

          {/* === FORM IFRAME === */}
          <iframe
            ref={iframeRef}
            src={src}
            title={tab === "offer" ? t("offerTitle") : t("carrierTitle")}
            className="w-full"
            style={{
              height: "75vh",
              minHeight: "600px",
              border: 0,
              borderRadius: "16px",
              backgroundColor: "white",
            }}
            loading="lazy"
            allow="clipboard-write; fullscreen"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>
    </section>
  );
}
