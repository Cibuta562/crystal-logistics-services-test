"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CookieSettings from "./CookieSettings";
import {
  getPreferences,
  savePreferences,
  enableAnalytics,
} from "./cookieHelpers";

type Locale = "ro" | "en";

export default function CookieBanner() {
  const t = useTranslations("cookie");
  const locale = useLocale() as Locale;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const prefs = getPreferences();
    if (!prefs) setShowBanner(true);
    else enableAnalytics();
  }, []);

  const acceptAll = () => {
    savePreferences({ functional: true, analytics: true, marketing: true });
    enableAnalytics();
    setShowBanner(false);
  };

  const changeLanguage = (newLocale: Locale) => {
    if (newLocale === locale) return;

    const segments = pathname.split("/");
    if (segments.length > 1) segments[1] = newLocale;
    const nextPath = segments.join("/") || `/${newLocale}`;

    const qs = searchParams.toString();
    router.push(qs ? `${nextPath}?${qs}` : nextPath);
  };

  if (!showBanner) return null;

  return (
    <>
      {showSettings && (
        <CookieSettings onClose={() => setShowSettings(false)} />
      )}

      <div className="fixed bottom-0 left-0 z-[9999] flex w-full flex-col items-center justify-between gap-3 border-t border-white/10 bg-neutral-900/90 p-4 text-white backdrop-blur-sm md:flex-row">
        <p className="text-sm text-white/80 md:text-base">{t("message")}</p>

        <div className="flex items-center gap-3">
          <select
            value={locale}
            onChange={(e) => changeLanguage(e.target.value as Locale)}
            className="rounded-md border border-white/10 bg-neutral-800 px-3 py-2 text-xs text-white transition hover:bg-neutral-700"
          >
            <option value="ro">RO</option>
            <option value="en">EN</option>
          </select>

          <button
            type="button"
            onClick={() => setShowSettings(true)}
            className="rounded-md border border-white/10 bg-neutral-700 px-4 py-2 text-xs transition hover:bg-neutral-600 md:text-sm"
          >
            {t("settings")}
          </button>

          <button
            type="button"
            onClick={acceptAll}
            className="rounded-md bg-yellow-400 px-4 py-2 text-xs font-semibold text-black transition hover:bg-yellow-300 md:text-sm"
          >
            {t("acceptAll")}
          </button>
        </div>
      </div>
    </>
  );
}
