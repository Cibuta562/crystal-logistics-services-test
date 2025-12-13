"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { Play, Pause } from "lucide-react";

const SECTION_CONTAINER =
    "mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12";

type HeadingLevel = "h1" | "h2" | "h3";
type ListType = "unordered" | "ordered";

type BaseProps = {
    eyebrow?: string;
    title: string;
    subtitle?: string;

    titleHref?: string;
    titleTarget?: "_self" | "_blank";

    paragraphs?: string[];

    listType?: ListType;
    listItems?: ReactNode[];

    imageSrc?: string | StaticImageData;
    imageAlt?: string;
    imagePriority?: boolean;

    videoSrc?: string;
    videoPoster?: string;

    headingLevel?: HeadingLevel;
    className?: string;
};

type SplitIntroSectionProps = BaseProps & {
    reverse?: boolean;
};

export default function ContentSplitSection({
                                                eyebrow,
                                                title,
                                                subtitle,
                                                titleHref,
                                                titleTarget = "_self",
                                                paragraphs,
                                                listType,
                                                listItems,
                                                imageSrc,
                                                imageAlt,
                                                imagePriority,
                                                videoSrc,
                                                videoPoster,
                                                headingLevel = "h1",
                                                reverse = false,
                                                className,
                                            }: SplitIntroSectionProps) {
    const HeadingTag = headingLevel;
    const hasList = listItems && listItems.length > 0;

    return (
        <section className={cn(SECTION_CONTAINER, "pt-10 pb-16", className)}>
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-stretch">

                {/* TEXT */}
                <div
                    className={cn(
                        "order-1 flex flex-col justify-center",
                        reverse ? "lg:order-2" : "lg:order-1"
                    )}
                >
                    <div className="mb-6">
                        <div className="mb-4 h-[3px] w-16 bg-[#FFD500]" />

                        {eyebrow && (
                            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                                {eyebrow}
                            </p>
                        )}

                        <HeadingTag className="uppercase text-2xl font-extrabold leading-snug tracking-tight md:text-3xl">
                            {titleHref ? (
                                <Link
                                    href={titleHref}
                                    target={titleTarget}
                                    className="relative inline-block transition-colors hover:text-[#FFD500]"
                                >
                                    {title}
                                </Link>
                            ) : (
                                title
                            )}
                        </HeadingTag>

                        {subtitle && (
                            <p className="mt-2 max-w-xl text-sm font-medium text-neutral-600">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {Array.isArray(paragraphs) &&
                        paragraphs.map((paragraph, idx) => (
                            <p
                                key={idx}
                                className={cn(
                                    "max-w-xl text-[15px] leading-relaxed text-neutral-700",
                                    idx === 0 ? "mb-4" : "mt-2"
                                )}
                            >
                                {paragraph}
                            </p>
                        ))}


                    {hasList && listType === "unordered" && (
                        <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-neutral-800">
                            {listItems!.map((item, idx) => (
                                <li key={idx} className="flex">
                                    <span className="mr-2 text-[#FFD500]">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {hasList && listType === "ordered" && (
                        <ol className="mt-4 ml-5 space-y-3 list-decimal text-[15px] leading-relaxed text-neutral-800">
                            {listItems!.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ol>
                    )}
                </div>

                {/* MEDIA */}
                <div
                    className={cn(
                        "order-2 flex items-stretch",
                        reverse ? "lg:order-1" : "lg:order-2"
                    )}
                >
                    {videoSrc ? (
                        <CareerStyleVideo src={videoSrc} poster={videoPoster} />
                    ) : (
                        imageSrc && (
                            <div className="relative w-full min-h-[260px] lg:min-h-[320px] rounded-[26px] overflow-hidden">
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt || ""}
                                    fill
                                    priority={imagePriority}
                                    className="object-cover"
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}

/* =================================
   VIDEO – IDENTIC CU CAREERS PAGE
================================= */
function CareerStyleVideo({
                              src,
                              poster,
                          }: {
    src: string;
    poster?: string;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };

    return (
        <div className="relative w-full h-full rounded-[26px] overflow-hidden shadow-2xl group">
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                playsInline
                loop
                muted
                className="w-full h-full object-cover"
                onClick={togglePlay}
            />

            <button
                onClick={togglePlay}
                className="
          absolute inset-0 flex items-center justify-center
          bg-black/0 group-hover:bg-black/40
          transition
        "
            >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {isPlaying ? (
                        <Pause className="w-16 h-16 text-white" />
                    ) : (
                        <Play className="w-16 h-16 text-white ml-1" />
                    )}
                </div>
            </button>
        </div>
    );
}

/* HELPERS */
export function ContentSplitLeft(props: BaseProps) {
    return <ContentSplitSection {...props} reverse />;
}

export function ContentSplitRight(props: BaseProps) {
    return <ContentSplitSection {...props} reverse={false} />;
}
