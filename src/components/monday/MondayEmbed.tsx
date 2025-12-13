"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  title?: string;
  /** spațiul rezervat pentru header + margin, scăzut din 100vh */
  viewportOffset?: number; // px
  maxHeight?: number; // px
};

export default function MondayEmbed({
  src,
  title = "Quote Request",
  viewportOffset = 220,
  maxHeight = 2000,
}: Props) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);

  // Auto-height dacă Monday trimite postMessage
  useEffect(() => {
    function onMessage(ev: MessageEvent) {
      const d = ev.data;
      if (typeof d === "object" && d?.type === "embed-size" && ref.current) {
        const h = Math.min(
          Math.max(
            Number(d.height) || 1100,
            window.innerHeight - viewportOffset
          ),
          maxHeight
        );
        ref.current.style.height = `${h}px`;
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [viewportOffset, maxHeight]);

  // Detectăm blocaj la încărcare
  useEffect(() => {
    const t = setTimeout(() => {
      if (!loaded) setBlocked(true);
    }, 2500);
    return () => clearTimeout(t);
  }, [loaded]);

  if (blocked) {
    return (
      <div className="w-full rounded-2xl border border-neutral-200 bg-white p-6 text-center">
        <p className="mb-4 text-neutral-600">
          Browserul blochează formularul încorporat.
        </p>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 font-medium text-white"
        >
          Deschide formularul într-un tab nou
        </a>
      </div>
    );
  }

  // înălțime full-screen (cu limită superioară) până vine auto-height
  const initialHeight = Math.min(
    Math.max(
      window?.innerHeight ? window.innerHeight - viewportOffset : 1100,
      900
    ),
    maxHeight
  );

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-neutral-50" />
      )}
      <iframe
        ref={ref}
        title={title}
        src={src}
        className="w-full"
        style={{ height: initialHeight }}
        onLoad={() => setLoaded(true)}
        allow="clipboard-write; fullscreen"
      />
    </div>
  );
}
