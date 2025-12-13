export type CookiePreferences = {
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "cookie-preferences";
const COOKIE_NAME = "cookie_preferences";
const MAX_AGE = 60 * 60 * 24 * 180;

type GtagCommand = "js" | "config";
type GtagFn = (command: GtagCommand, ...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

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

export function getPreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  const fromCookie = getCookie(COOKIE_NAME);
  if (fromCookie) {
    try {
      const parsed: unknown = JSON.parse(fromCookie);
      return isCookiePreferences(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
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

export function enableAnalytics(): void {
  if (typeof window === "undefined") return;

  const prefs = getPreferences();
  if (!prefs?.analytics) return;

  if (typeof window.gtag === "function") return;

  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-6FWM0KXD6P";
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];

  const gtag: GtagFn = (command, ...args) => {
    window.dataLayer?.push([command, ...args]);
  };

  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", "G-6FWM0KXD6P");
}
