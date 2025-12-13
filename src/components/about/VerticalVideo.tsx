"use client";
import React, { useRef, useState, useCallback } from "react";
import { Pause, Play } from "lucide-react";

type Props = {
  srcWebm?: string; // ex: "/media/clip.webm"
  srcMp4?: string; // ex: "/media/clip.mp4"
  poster?: string; // ex: "/media/poster.jpg"
  className?: string;
  loop?: boolean; // implicit true
  muted?: boolean; // implicit false
  nativeControls?: boolean; // afișează <video controls>; implicit false (folosim buton custom)
};

export default function VerticalVideo({
  srcWebm,
  srcMp4,
  poster,
  className = "",
  loop = true,
  muted = false,
  nativeControls = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setPlaying] = useState(false);

  const toggle = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      await el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }, []);

  return (
    <div
      className={[
        "overflow-hidden rounded-3xl border border-neutral-200 shadow-lg bg-black",
        className,
      ].join(" ")}
    >
      {/* container responsiv 9:16 */}
      <div className="relative w-full" style={{ aspectRatio: "9 / 16" }}>
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          loop={loop}
          muted={muted}
          playsInline
          poster={poster}
          preload="metadata"
          controls={nativeControls} // controale native opționale
          // NOTA: fără autoPlay -> pornește oprit
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          {srcWebm ? <source src={srcWebm} type="video/webm" /> : null}
          {srcMp4 ? <source src={srcMp4} type="video/mp4" /> : null}
          Your browser does not support the video tag.
        </video>

        {/* Buton PLAY/PAUSE custom (ascuns dacă folosești controls native) */}
        {!nativeControls && (
          <button
            type="button"
            onClick={toggle}
            className="absolute bottom-4 right-4 inline-flex items-center justify-center rounded-full bg-white/90 p-3 shadow-md transition active:scale-95"
            aria-label={isPlaying ? "Pauză" : "Redare"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-neutral-900" />
            ) : (
              <Play className="h-5 w-5 text-neutral-900" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
