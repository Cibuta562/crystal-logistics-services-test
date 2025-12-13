export type CookiePreferences = {
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "cookie-preferences";
const GA_ID = "G-6FWM0KXD6P";

type GtagFn = (...args: unknown[]) => void;

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: GtagFn;
};

export function getPreferences(): CookiePreferences | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!isCookiePreferences(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function savePreferences(prefs: CookiePreferences): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function enableAnalytics(): void {
  if (typeof window === "undefined") return;

  const prefs = getPreferences();
  if (!prefs?.analytics) return;

  const w = window as GtagWindow;

  if (typeof w.gtag === "function") return;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.body.appendChild(script);

  w.dataLayer = w.dataLayer ?? [];

  const gtag: GtagFn = (...args) => {
    w.dataLayer?.push(args);
  };

  w.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_ID);
}

function isCookiePreferences(v: unknown): v is CookiePreferences {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.functional === "boolean" &&
    typeof o.analytics === "boolean" &&
    typeof o.marketing === "boolean"
  );
}
