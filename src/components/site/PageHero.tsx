import React from "react";
import Image from "next/image";

type SlantedHeaderProps = {
    eyebrow?: string;
    title: string;

    /** Imagine full background (opțională) */
    imageSrc?: string | null;
    imageAlt?: string;
    imagePriority?: boolean;
    imageQuality?: number;
    imageClassName?: string;

    /** Fundal fallback sau fundal personalizat */
    bgClassName?: string;

    /** Înălțimea minimă pe desktop */
    desktopMinHeightClassName?: string;
};

export default function PageHero({
                                     eyebrow,
                                     title,

                                     imageSrc = null,
                                     imageAlt = "",
                                     imagePriority = false,
                                     imageQuality = 100,
                                     imageClassName = "object-cover",

                                     bgClassName = "bg-amber-400",
                                     desktopMinHeightClassName = "md:min-h-[33vh]",
                                 }: SlantedHeaderProps) {
    const hasImage = Boolean(imageSrc);

    return (
        <header
            className={[
                "relative w-full overflow-hidden",
                "min-h-[45vh]",                 // ← HERO MAI ÎNALT PE MOBILE
                desktopMinHeightClassName,
                !hasImage && bgClassName,
                hasImage ? "text-white" : "text-neutral-900",
            ].join(" ")}
        >
            {/* BACKGROUND IMAGE */}
            {hasImage && (
                <div className="absolute inset-0">
                    <Image
                        src={imageSrc as string}
                        alt={imageAlt}
                        fill
                        priority={imagePriority}
                        quality={imageQuality}
                        className={imageClassName}
                    />
                    <div className="absolute inset-0 bg-black/70 md:bg-black/60" />
                </div>
            )}

            {/* CONTENT */}
            <div className="relative z-10 mx-auto max-w-6xl px-4">
                <div className="flex min-h-[55vh] md:min-h-[45vh] items-center justify-start py-10 md:py-0">
                    <div className="text-left md:text-left">
                        {/* TITLE */}
                        <h1
                            className={[
                                "text-4xl md:text-5xl font-extrabold tracking-tight leading-tight",
                                hasImage ? "text-white drop-shadow-lg" : "text-neutral-900",
                            ].join(" ")}
                        >
                            {title}
                        </h1>

                        {/* EYEBROW */}
                        {eyebrow && (
                            <div
                                className={[
                                    "mt-2 text-base md:text-lg font-semibold tracking-wide",
                                    hasImage ? "text-white/90" : "text-neutral-900/90",
                                ].join(" ")}
                            >
                                <span>/ </span>
                                <span>{eyebrow}</span>
                                <span> /</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
