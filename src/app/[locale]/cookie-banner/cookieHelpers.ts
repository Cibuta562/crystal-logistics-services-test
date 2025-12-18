export type CookiePreferences = {
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "cookie-preferences";
const COOKIE_NAME = "cookie_preferences";
const MAX_AGE = 60 * 60 * 24 * 180;

type ConsentStatus = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/* =========================
   Cookie helpers (PĂSTRATE)
   ========================= */

function isSecure(): boolean {
  return typeof window !== "undefined" && window.location.protocol === "https:";
}

function setCookie(name: string, value: string, maxAge: number): void {
  if (typeof document === "undefined") return;
  const secure = isSecure() ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(
      value
  )}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`));
  if (!match) return null;
  return decodeURIComponent(match.split("=").slice(1).join("="));
}

function isCookiePreferences(v: unknown): v is CookiePreferences {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
      typeof o.functional === "boolean" &&
      typeof o.analytics === "boolean" &&
      typeof o.marketing === "boolean"
  );
}

/* =========================
   Public API
   ========================= */

export function getPreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  const fromCookie = getCookie(COOKIE_NAME);
  if (fromCookie) {
    try {
      const parsed = JSON.parse(fromCookie);
      return isCookiePreferences(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    return isCookiePreferences(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function savePreferences(prefs: CookiePreferences): void {
  if (typeof window === "undefined") return;

  const json = JSON.stringify(prefs);
  setCookie(COOKIE_NAME, json, MAX_AGE);
  window.localStorage.setItem(STORAGE_KEY, json);
}

/* =========================
   🔥 GTM + Consent Mode v2
   ========================= */

function map(value: boolean): ConsentStatus {
  return value ? "granted" : "denied";
}

export function enableAnalytics(prefs?: CookiePreferences): void {
  if (typeof window === "undefined") return;

  const p = prefs ?? getPreferences();
  if (!p) return;

  window.dataLayer = window.dataLayer || [];

  // 🔔 eveniment custom pt. GTM (opțional, dar util)
  window.dataLayer.push({
    event: "cookie_consent_update",
    consent: p,
  });

  // Google Consent Mode v2
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: map(p.analytics),
      ad_storage: map(p.marketing),
      ad_user_data: map(p.marketing),
      ad_personalization: map(p.marketing),
    });
  }
}
