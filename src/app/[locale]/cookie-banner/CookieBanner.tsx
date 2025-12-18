"use client";

import { useEffect, useState } from "react";
import CookieSettings from "./CookieSettings";
import {
  getPreferences,
  savePreferences,
  enableAnalytics,
  type CookiePreferences,
} from "./cookieHelpers";

export default function CookieBanner() {
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
    enableAnalytics(prefs); // trimite DENIED către GTM
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
      <>
        {showSettings && (
            <CookieSettings onClose={() => setShowSettings(false)} />
        )}

        <div className="fixed bottom-0 left-0 z-[9999] flex w-full flex-col items-center justify-between gap-3 border-t border-white/10 bg-neutral-900/90 p-4 text-white backdrop-blur-sm md:flex-row">
          <p className="text-sm text-white/80 md:text-base">
            Folosim cookie-uri pentru a îmbunătăți experiența pe site. Poți accepta
            toate cookie-urile, le poți respinge sau le poți configura.
          </p>

          <div className="flex items-center gap-3">
            {/* Settings */}
            <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="rounded-md border border-white/10 bg-neutral-700 px-4 py-2 text-xs transition hover:bg-neutral-600 md:text-sm"
            >
              Setări
            </button>

            {/* Deny all */}
            <button
                type="button"
                onClick={denyAll}
                className="rounded-md border border-white/10 bg-neutral-700 px-4 py-2 text-xs transition hover:bg-neutral-600 md:text-sm"
            >
              Respinge toate
            </button>

            {/* Accept all */}
            <button
                type="button"
                onClick={acceptAll}
                className="rounded-md bg-yellow-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-yellow-300 md:text-sm"
            >
              Acceptă toate
            </button>
          </div>
        </div>
      </>
  );
}
