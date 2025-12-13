"use client";

import { LucideIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTION_CONTAINER = "mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12";

export type AccordionItemData = {
  id: string;
  title: string;
  subtitle?: string; // aici punem textul scurt (din listItems[0] sau short)
  paragraphs?: string[]; // nu mai sunt folosite aici, dar rămân pt compat
  listItems?: string[];
  icon?: LucideIcon;
  groupParagraphsWithListItems?: boolean;
};

type ColumnConfig = {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  items: AccordionItemData[];
  defaultValue?: string; // ignorat acum
  accent?: "left" | "right";
};

interface SplitAccordionSectionProps {
  id?: string;
  left: ColumnConfig;
  right: ColumnConfig;
}

export function SplitAccordionSection({
  id,
  left,
  right,
}: SplitAccordionSectionProps) {
  return (
    <section id={id} className="relative py-16 lg:py-24">
      <div className={SECTION_CONTAINER}>
        <div className="grid gap-10 lg:grid-cols-2">
          <ColumnCard {...left} accent="left" />
          <ColumnCard {...right} accent="right" />
        </div>
      </div>
    </section>
  );
}

function ColumnCard({
  eyebrow,
  title,
  intro,
  items,
  accent = "left",
}: ColumnConfig) {
  const isLeft = accent === "left";

  const cardClasses = cn(
    "relative h-full overflow-hidden rounded-3xl border shadow-xl",
    isLeft
      ? "bg-[#FFD500] border-yellow-300/70"
      : "bg-[#042a45] border-sky-500/40"
  );

  const headerText = isLeft ? "text-slate-900" : "text-slate-50";
  const bodyText = isLeft ? "text-slate-900" : "text-slate-100";

  const badgeClasses = cn(
    "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase",
    isLeft ? "bg-black/5 text-slate-900/80" : "bg-white/10 text-slate-100/80"
  );

  const itemBase =
    "group w-full rounded-2xl border px-4 py-3 text-left text-sm md:text-base shadow-sm " +
    "flex items-stretch justify-between gap-4 transition-all " +
    "no-underline hover:no-underline focus-visible:no-underline";

  const itemClasses = cn(
    itemBase,
    isLeft
      ? "bg-white text-slate-900 border-transparent hover:bg-[#fff4c2] hover:border-black/10 hover:ring-2 hover:ring-black/10"
      : "bg-slate-900 text-slate-50 border-transparent hover:bg-slate-800 hover:border-sky-400/50 hover:ring-2 hover:ring-sky-400/50"
  );

  return (
    <div className={cardClasses}>
      {/* decor subtil */}
      <div className="pointer-events-none absolute inset-y-0 right-[-18%] w-1/2 opacity-10 blur-3xl">
        <div
          className={cn(
            "h-full w-full",
            isLeft
              ? "bg-[radial-gradient(circle_at_top,_white,_transparent)]"
              : "bg-[radial-gradient(circle_at_top,_#38bdf8,_transparent)]"
          )}
        />
      </div>

      <div className="relative flex h-full flex-col gap-6 p-6 sm:p-8">
        {/* header coloană – min-height comună ca să fie aliniate pe desktop */}
        <div className="space-y-4 lg:min-h-[220px]">
          {eyebrow && (
            <div className={badgeClasses}>
              <span className="h-px w-6 rounded-full bg-current" />
              <span>{eyebrow}</span>
            </div>
          )}

          <h2
            className={cn(
              "text-2xl font-semibold leading-tight md:text-3xl",
              headerText
            )}
          >
            {title}
          </h2>

          {intro && (
            <p
              className={cn(
                "max-w-prose text-sm leading-relaxed md:text-[15px]",
                bodyText
              )}
            >
              {intro}
            </p>
          )}
        </div>

        {/* lista de beneficii – doar cards, fără acordeon */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="border-0">
              <div className={itemClasses}>
                <div className="flex flex-1 items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold",
                      isLeft ? "bg-black/7" : "bg-white/10"
                    )}
                  >
                    <Check className="h-4 w-4" />
                  </span>

                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold tracking-wide md:text-sm">
                      {item.title}
                    </span>
                    {item.subtitle && (
                      <span className="text-[11px] md:text-xs opacity-80">
                        {item.subtitle}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
