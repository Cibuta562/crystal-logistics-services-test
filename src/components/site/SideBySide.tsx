"use client";

import { cn } from "@/lib/utils";

const SECTION_CONTAINER = "mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12";

type HeadingLevel = "h2" | "h3";

type TextColumn = {
  title: string;
  paragraphs: string[]; // unul sau mai multe paragrafe
};

interface SideBySideTextSectionProps {
  id?: string;
  items: TextColumn[]; // de obicei 2, dar poate fi și 1 sau 3
  headingLevel?: HeadingLevel;
  className?: string; // stil suplimentar pentru <section>
}

export default function SideBySideTextSection({
  id,
  items,
  headingLevel = "h2",
  className,
}: SideBySideTextSectionProps) {
  const HeadingTag = headingLevel;

  return (
    <section id={id} className={cn("bg-white", className)}>
      <div className={`${SECTION_CONTAINER} py-16`}>
        <div className="grid gap-12 md:grid-cols-2">
          {items.map((item, columnIndex) => (
            <div key={item.title + columnIndex}>
              <div className="mb-6">
                <div className="mb-4 h-[3px] w-16 bg-[#FFD500]" />
                <HeadingTag className="text-xl font-extrabold uppercase tracking-tight text-neutral-900 md:text-2xl">
                  {item.title}
                </HeadingTag>
              </div>

              {item.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={cn(
                    "text-[15px] leading-relaxed text-neutral-700",
                    idx > 0 && "mt-3"
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
