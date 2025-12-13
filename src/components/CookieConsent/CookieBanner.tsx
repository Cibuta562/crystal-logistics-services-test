"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import CookieSettings from "./CookieSettings";
import {
  getPreferences,
  savePreferences,
  enableAnalytics,
} from "./cookieHelpers";

export default function CookieBanner() {
  const t = useTranslations("cookie");

  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const prefs = getPreferences();
    if (!prefs) {
      setShowBanner(true);
    } else {
      // dacă în helper verifici prefs.analytics, lasă-l așa
      enableAnalytics();
    }
  }, []);

  const acceptAll = () => {
    savePreferences({ functional: true, analytics: true, marketing: true });
    enableAnalytics();
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
          fixed bottom-0 left-0 w-full
          bg-neutral-900/90 backdrop-blur-sm
          text-white border-t border-white/10
          p-4 z-[9999]
          flex flex-col md:flex-row items-center justify-between gap-3
        "
      >
        <p className="text-sm md:text-base text-white/80">{t("message")}</p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSettings(true)}
            className="
              px-4 py-2 rounded-md text-xs md:text-sm
              bg-neutral-700
              border border-white/10
              hover:bg-neutral-600
              transition
            "
          >
            {t("settings")}
          </button>

          <button
            onClick={acceptAll}
            className="
              px-4 py-2 rounded-md text-xs md:text-sm
              bg-yellow-400 text-black font-semibold
              hover:bg-yellow-300
              transition
            "
          >
            {t("acceptAll")}
          </button>
        </div>
      </div>
    </>
  );
}
