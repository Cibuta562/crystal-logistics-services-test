export {};

declare global {
  type GtagCommand = "config" | "event" | "js" | "set" | "consent";

  type GtagFn = (
    command: GtagCommand,
    targetIdOrName: string | Date,
    params?: Record<string, unknown>
  ) => void;

  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}
