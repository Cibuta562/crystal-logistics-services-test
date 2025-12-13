const GA_ID = "G-6FWM0KXD6P";

export function pageview(url: string) {
  if (typeof window === "undefined") return;

  const gtag = window.gtag;
  if (!gtag) return;

  gtag("config", GA_ID, { page_path: url });
}
