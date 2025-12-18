"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CookieSettings from "./CookieSettings";
import {
  getPreferences,
  savePreferences,
  enableAnalytics,
  type CookiePreferences,
} from "./cookieHelpers";

/* =========================
   TRANSLATIONS (INLINE)
   ========================= */

const TRANSLATIONS = {
  ro: {
    message:
        "Folosim cookie-uri pentru a îmbunătăți experiența pe site. Poți accepta toate cookie-urile, le poți respinge sau le poți configura.",
    settings: "Setări",
    denyAll: "Respinge toate",
    acceptAll: "Acceptă toate",
  },
  en: {
    message:
        "We use cookies to improve your experience on the website. You can accept all cookies, reject them, or configure your preferences.",
    settings: "Settings",
    denyAll: "Reject all",
    acceptAll: "Accept all",
  },
  fr: {
    message:
        "Nous utilisons des cookies pour améliorer votre expérience sur le site. Vous pouvez accepter tous les cookies, les refuser ou les configurer.",
    settings: "Paramètres",
    denyAll: "Tout refuser",
    acceptAll: "Tout accepter",
  },
  it: {
    message:
        "Utilizziamo i cookie per migliorare la tua esperienza sul sito. Puoi accettare tutti i cookie, rifiutarli o configurarli.",
    settings: "Impostazioni",
    denyAll: "Rifiuta tutti",
    acceptAll: "Accetta tutti",
  },
  de: {
    message:
        "Wir verwenden Cookies, um Ihre Erfahrung auf der Website zu verbessern. Sie können alle Cookies akzeptieren, ablehnen oder konfigurieren.",
    settings: "Einstellungen",
    denyAll: "Alle ablehnen",
    acceptAll: "Alle akzeptieren",
  },
  pl: {
    message:
        "Używamy plików cookie, aby poprawić Twoje doświadczenie na stronie. Możesz zaakceptować wszystkie pliki cookie, odrzucić je lub skonfigurować.",
    settings: "Ustawienia",
    denyAll: "Odrzuć wszystkie",
    acceptAll: "Akceptuj wszystkie",
  },
} as const;

type Locale = keyof typeof TRANSLATIONS;

/* =========================
   COMPONENT
   ========================= */

export default function CookieBanner() {
  const pathname = usePathname();

  // detectăm limba din URL (/ro, /en, etc.)
  const locale = (pathname.split("/")[1] as Locale) || "ro";
  const t = TRANSLATIONS[locale] ?? TRANSLATIONS.ro;

  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const prefs = getPreferences();
    if (!prefs) {
      setShowBanner(true);
    } else {
      enableAnalytics(prefs);
    }
  }, []);

  /* =========================
     CTA HANDLERS
     ========================= */

  const acceptAll = () => {
    const prefs: CookiePreferences = {
      functional: true,
      analytics: true,
      marketing: true,
    };

    savePreferences(prefs);
    enableAnalytics(prefs);
    setShowBanner(false);
  };

  const denyAll = () => {
    const prefs: CookiePreferences = {
      functional: true,
      analytics: false,
      marketing: false,
    };

    savePreferences(prefs);
    enableAnalytics(prefs);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
      <>
        {showSettings && (
            <CookieSettings onClose={() => setShowSettings(false)} />
        )}

        <div
            className="
          fixed bottom-0 left-0 z-[2147483647]
          flex w-full flex-col gap-4
          border-t border-white/10
          bg-neutral-900/90 p-4
          text-white backdrop-blur-sm
          md:flex-row md:items-center md:justify-between
        "
        >
          <p className="text-sm text-white/80 md:text-base md:max-w-[60%]">
            {t.message}
          </p>

          <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:gap-3">
            <button
                onClick={() => setShowSettings(true)}
                className="rounded-md border border-white/10 bg-neutral-700 px-4 py-2 text-sm hover:bg-neutral-600 transition"
            >
              {t.settings}
            </button>

            <button
                onClick={denyAll}
                className="rounded-md border border-white/10 bg-neutral-700 px-4 py-2 text-sm hover:bg-neutral-600 transition"
            >
              {t.denyAll}
            </button>

            <button
                onClick={acceptAll}
                className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300 transition"
            >
              {t.acceptAll}
            </button>
          </div>
        </div>
      </>
  );
}
