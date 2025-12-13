"use client";

import { LucideIcon } from "lucide-react";

const SECTION_CONTAINER = "mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12";

export type FlipCardItem = {
  icon: LucideIcon;
  title: string;

  /**
   * Folosit DOAR ca fallback pentru body, dacă nu există description/descriptions.
   * Nu se mai afișează sub titlu.
   */
  short?: string;

  /**
   * Text extins:
   * - folosește `descriptions` pentru mai multe paragrafe
   * - sau `description` pentru un singur paragraf (backwards compatible)
   */
  description?: string;
  descriptions?: string[];
};

interface FlipCardsSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: FlipCardItem[];

  sectionBgClassName?: string;
  accentBarClassName?: string;
  frontBgClassName?: string;
  frontTextClassName?: string;
  backBgClassName?: string;
  backTextClassName?: string;
}

/**
 * Secțiune generică cu carduri de beneficii/avantaje (fără flip).
 * Implicit:
 * - fundal secțiune alb
 * - header card: galben
 * - body card: alb, text închis
 * - câte 1 card pe rând, full-width în container
 */
export default function FlipCardsSection({
  id,
  eyebrow,
  title,
  description,
  items,
  sectionBgClassName = "bg-white",
  accentBarClassName = "bg-[#FFD500]",
  frontBgClassName = "bg-[#FFD500]", // header card
  frontTextClassName = "text-neutral-900",
  backBgClassName = "bg-white", // body card light
  backTextClassName = "text-neutral-800",
}: FlipCardsSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section id={id} className={sectionBgClassName}>
      <div className={`${SECTION_CONTAINER} py-16`}>
        {/* HEADLINE – full width în container */}
        <div className="mb-10">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
              {eyebrow}
            </p>
          )}

          <div className={`mb-4 h-[3px] w-16 ${accentBarClassName}`} />

          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-neutral-900 md:text-3xl">
            {title}
          </h2>

          {description && (
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
              {description}
            </p>
          )}
        </div>

        {/* CARDURI – câte 1 pe rând, full-width în container */}
        <div className="space-y-8">
          {items.map((card) => {
            const Icon = card.icon;
            const paragraphs =
              card.descriptions ??
              (card.description
                ? [card.description]
                : card.short
                ? [card.short]
                : []);

            return (
              <article
                key={card.title}
                className="flex w-full flex-col overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)] transition hover:-translate-y-[3px] hover:shadow-[0_18px_45px_rgba(15,23,42,0.18)]"
              >
                {/* HEADER CARD – icon + title */}
                <div
                  className={`flex items-center gap-4 px-6 py-5 ${frontBgClassName} ${frontTextClassName}`}
                >
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black/10">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-sm font-semibold uppercase tracking-tight md:text-[15px]">
                    {card.title}
                  </h3>
                </div>

                {/* BODY CARD – text extins (1+ paragrafe) */}
                <div
                  className={`flex flex-1 flex-col px-6 pb-6 pt-5 text-sm leading-relaxed ${backBgClassName} ${backTextClassName}`}
                >
                  {paragraphs.length > 0 && (
                    <div className="space-y-3 text-[14px] leading-relaxed">
                      {paragraphs.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
