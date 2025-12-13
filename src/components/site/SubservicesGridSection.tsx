"use client";

import Image from "next/image";
import Link from "next/link";

const SECTION_CONTAINER = "mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12";

export type SubserviceItem = {
  key?: string;
  title: string;
  /**
   * Descriere simplă (fallback)
   */
  description?: string;
  /**
   * Descriere împărțită pe paragrafe
   */
  paragraphs?: string[];

  href: string;
  imageSrc?: string;
  imageAlt?: string;
};

interface SubservicesProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  items: SubserviceItem[];

  sectionBgClassName?: string;
  accentBarClassName?: string;
  cardTopBarClassName?: string;
}

/**
 * Secțiune de subservicii:
 * - desktop: 3 coloane
 * - tabletă: 2 coloane
 * - mobil: 1 coloană
 * - fără carusel, afișează toate cardurile, pe rânduri
 */
export default function SubservicesGridSection({
  id,
  eyebrow,
  title,
  description,
  items,
  sectionBgClassName = "bg-white",
  accentBarClassName = "bg-[#FFD500]",
  cardTopBarClassName = "bg-[#FFD500]",
}: SubservicesProps) {
  if (!items || items.length === 0) return null;

  // variant completă (culoare + underline) – o folosim pe fundal alb (imagine)
  const hoverLinkClass =
    "relative inline-block transition-colors duration-200 hover:text-[#FFD500] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#FFD500] after:transition-[width] after:duration-300 hover:after:w-full";

  // variantă pentru fundal colorat (galben) – doar underline, nu schimbăm culoarea textului
  const hoverLinkOnAccentBgClass =
    "relative inline-block transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#FFD500] after:transition-[width] after:duration-300 hover:after:w-full";

  return (
    <section id={id} className={sectionBgClassName}>
      <div className={`${SECTION_CONTAINER} py-16`}>
        {/* HEADLINE */}
        <div className="mb-12 max-w-3xl">
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

        {/* GRID – 1 / 2 / 3 coloane */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.key ?? item.title}
              className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-neutral-200 bg-white shadow-sm hover:shadow-lg"
            >
              {/* top bar – titlu clicabil, underline only */}
              <div
                className={`px-6 py-4 text-center text-sm font-semibold uppercase text-balance tracking-[0.15em] text-neutral-900 ${cardTopBarClassName}`}
              >
                <Link href={item.href} className={hoverLinkOnAccentBgClass}>
                  {item.title}
                </Link>
              </div>

              {/* imagine – clicabilă, cu efect complet */}
              <Link
                href={item.href}
                className={`${hoverLinkClass} relative block h-40 w-full overflow-hidden sm:h-48`}
              >
                <Image
                  src={item.imageSrc ?? "/images/placeholders/service.jpg"}
                  alt={item.imageAlt ?? item.title}
                  fill
                  className="object-cover"
                />
              </Link>

              {/* content */}
              <div className="flex flex-1 flex-col justify-between px-6 pb-6 pt-5 text-sm leading-relaxed text-neutral-700">
                {/* descriere: paragrafe sau text simplu */}
                {item.paragraphs && item.paragraphs.length > 0 ? (
                  <div>
                    {item.paragraphs.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className={`text-[15px] leading-relaxed text-neutral-700 ${
                          idx === 0 ? "mb-3" : "mt-2"
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : item.description ? (
                  <p className="text-[15px] leading-relaxed text-neutral-700">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
