"use client";

import { LucideIcon } from "lucide-react";

const SECTION_CONTAINER = "mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12";

export type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string | string[];
};

interface FeatureHighlightSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: FeatureItem[];

  sectionClassName?: string; // bg + text color
  cardClassName?: string;
}

export default function FeatureHighlightSection({
  id,
  eyebrow,
  title,
  description,
  items,
  sectionClassName = "bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 text-white",
  cardClassName = "group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-sm transition hover:-translate-y-1 hover:border-amber-300/70 hover:bg-white/10",
}: FeatureHighlightSectionProps) {
  const isEven = items.length % 2 === 0;
  const gridColsClass = isEven ? "sm:grid-cols-2" : "sm:grid-cols-1";

  return (
    <section id={id} className={sectionClassName}>
      <div className={`${SECTION_CONTAINER} py-16`}>
        {/* HEADLINE */}
        <div className="mx-auto max-w-5xl text-center">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/80">
              {eyebrow}
            </p>
          )}

          <h2 className="text-balance text-2xl font-extrabold uppercase leading-snug tracking-tight md:text-3xl">
            {title}
          </h2>

          {description && (
            <p className="text-balance mt-4 text-[15px] leading-relaxed text-slate-100">
              {description}
            </p>
          )}
        </div>

        {/* FEATURES – 1 col pe mobil, 1 sau 2 coloane pe desktop în funcție de număr */}
        <div className={`mt-12 grid gap-8 ${gridColsClass}`}>
          {items.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className={cardClassName}>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-300/15 text-amber-300">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-semibold uppercase tracking-tight">
                  {feature.title}
                </h3>

                {Array.isArray(feature.description) ? (
                  feature.description.map((paragraph, index) => (
                    <p
                      key={index}
                      className={`text-sm leading-relaxed text-slate-100 ${
                        index === 0 ? "mt-3" : "mt-2"
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-slate-100">
                    {feature.description}
                  </p>
                )}

                <div className="mt-4 h-[2px] w-0 bg-amber-300 transition-all group-hover:w-20" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
