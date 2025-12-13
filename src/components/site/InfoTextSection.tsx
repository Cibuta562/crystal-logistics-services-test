"use client";

import { cn } from "@/lib/utils";

const SECTION_CONTAINER = "mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12";

type InfoSectionListItem = {
  label?: string; // ex: "Grupa I:"
  text: string; // ex: " substanțe foarte periculoase;"
};

interface InfoTextSectionProps {
  id?: string;
  title: string;

  // poți folosi fie "introParagraphs", fie "paragraphs"
  introParagraphs?: string[];
  paragraphs?: string[];

  listTitle?: string;
  listItems?: InfoSectionListItem[];
  outroParagraphs?: string[];
  className?: string;
}

export default function InfoTextSection({
  id,
  title,
  introParagraphs,
  paragraphs,
  listTitle,
  listItems,
  outroParagraphs,
  className,
}: InfoTextSectionProps) {
  // suportă ambele nume de prop și fallback la []
  const initialParagraphs = introParagraphs ?? paragraphs ?? [];
  const hasList = !!(listItems && listItems.length > 0);

  return (
    <section id={id} className={cn("bg-white", className)}>
      <div className={`${SECTION_CONTAINER} py-8`}>
        <div>
          {/* Header */}
          <div className="mb-6">
            <div className="mb-4 h-[3px] w-16 bg-[#FFD500]" />
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              {title}
            </h2>
          </div>

          {/* Paragrafe inițiale */}
          {initialParagraphs.map((paragraph, idx) => (
            <p
              key={`intro-${idx}`}
              className="mb-4 text-[15px] leading-relaxed text-neutral-700"
            >
              {paragraph}
            </p>
          ))}

          {/* Listă opțională */}
          {hasList && (
            <>
              {listTitle && (
                <p className="mb-2 text-[15px] font-semibold text-neutral-900">
                  {listTitle}
                </p>
              )}

              <ul className="mb-4 space-y-1 text-[15px] leading-relaxed text-neutral-700">
                {listItems!.map((item, idx) => (
                  <li key={idx}>
                    {item.label && (
                      <span className="font-semibold">{item.label}</span>
                    )}
                    {item.text}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Paragrafe finale */}
          {outroParagraphs?.map((paragraph, idx) => (
            <p
              key={`outro-${idx}`}
              className={cn(
                "text-[15px] leading-relaxed text-neutral-700",
                idx < (outroParagraphs.length ?? 0) - 1 && "mb-4"
              )}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
