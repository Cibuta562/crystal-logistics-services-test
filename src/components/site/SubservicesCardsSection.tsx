"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SECTION_CONTAINER = "mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12";

/**
 * Types
 */
export type SlideImage = { src: string; alt?: string };

// (înainte) export type ServiceShowcaseItem = { ... }
export type ServiceShowcaseItem = {
  key?: string;
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  images?: SlideImage[];
  groupedItems?: ServiceShowcaseItem[]; // <-- adăugat
  href?: string;
};

interface ServiceShowcaseSectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  ctaLabel?: string; // text buton (același pt toate cardurile)
  items: ServiceShowcaseItem[];
  useCarousel?: boolean; // true = outer section carousel, false/undef = grid
  className?: string;
}

export default function ServiceShowcaseSection({
  id,
  eyebrow,
  title,
  intro,
  ctaLabel,
  items,
  useCarousel = false,
  className,
}: ServiceShowcaseSectionProps) {
  if (!items || !items.length) return null;

  return (
    <section id={id} className={cn("bg-white text-neutral-900", className)}>
      <div className={`${SECTION_CONTAINER} py-16`}>
        {/* HEADER */}
        {(eyebrow || title) && (
          <div className="mb-8">
            {eyebrow && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-500">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-4 max-w-4xl text-[15px] leading-relaxed text-neutral-700">
                {intro}
              </p>
            )}
          </div>
        )}

        {useCarousel ? (
          <OuterCarouselLayout items={items} ctaLabel={ctaLabel} />
        ) : (
          <GridLayout items={items} ctaLabel={ctaLabel} />
        )}
      </div>
    </section>
  );
}

/* ---------- Grid layout: 2 columns on md+, 1 column on mobile ---------- */
function GridLayout({
  items,
  ctaLabel,
}: {
  items: ServiceShowcaseItem[];
  ctaLabel?: string;
}) {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      {items.map((card, idx) => {
        const key = card.key ?? card.title + idx;

        // dacă avem groupedItems, afișăm un card special cu inner carousel
        if (card.groupedItems && card.groupedItems.length) {
          return (
            <article
              key={key}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)] p-6"
            >
              <div className="mb-4 h-[3px] w-12 bg-[#FFD500]" />
              <h3 className="mb-2 text-lg font-semibold tracking-tight">
                {card.title}
              </h3>
              {card.description && (
                <p className="mb-6 text-sm leading-relaxed text-neutral-700">
                  {card.description}
                </p>
              )}

              {/* INNER CAROUSEL: fiecare groupedItem e un slide */}
              <div className="relative">
                <Carousel
                  opts={{ align: "center", loop: true }}
                  className="w-full"
                >
                  <CarouselContent>
                    {card.groupedItems.map((g, gi) => (
                      <CarouselItem
                        key={(g.key ?? g.title) + gi}
                        className="basis-full px-2"
                      >
                        {/* Slide container: ocupă înălțimea și împinge butonul la bază */}
                        <div className="flex h-full flex-col gap-4">
                          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-50">
                            {g.imageSrc ? (
                              <Image
                                src={g.imageSrc}
                                alt={g.imageAlt ?? g.title}
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 33vw, 100vw"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                                No image
                              </div>
                            )}
                          </div>

                          {/* Conținut text + buton; butonul este la baza containerului */}
                          <div className="flex flex-1 flex-col justify-between px-2 pb-2">
                            <div>
                              <h4 className="text-sm font-semibold uppercase">
                                {g.title}
                              </h4>
                              {g.description && (
                                <p className="mt-2 text-xs text-neutral-600 line-clamp-4">
                                  {g.description}
                                </p>
                              )}
                            </div>

                            {g.href && ctaLabel && (
                              <div className="mt-4">
                                <Link
                                  href={g.href}
                                  className="inline-flex items-center gap-2 rounded-full border border-[#FFD500] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#FFD500] transition hover:bg-[#FFD500] hover:text-neutral-900"
                                >
                                  {ctaLabel}
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1 shadow-sm" />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1 shadow-sm" />
                </Carousel>
              </div>
            </article>
          );
        }

        // fallback - card normal (un singur card)
        return (
          <article
            key={key}
            className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)]"
          >
            {/* imagine */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              {renderCardImageArea(card, `grid-${idx}`)}
            </div>

            {/* text */}
            <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
              <div className="mb-4 h-[3px] w-12 bg-[#FFD500]" />
              <h3 className="text-lg font-semibold tracking-tight uppercase">
                {card.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-700">
                {card.description}
              </p>

              {card.href && ctaLabel && (
                <div className="mt-5">
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-2 rounded-full border border-[#FFD500] px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#FFD500] transition hover:bg-[#FFD500] hover:text-neutral-900"
                  >
                    {ctaLabel}
                    <span aria-hidden>↗</span>
                  </Link>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* ---------- Outer carousel layout (one card per slide) ---------- */
function OuterCarouselLayout({
  items,
  ctaLabel,
}: {
  items: ServiceShowcaseItem[];
  ctaLabel?: string;
}) {
  return (
    <Carousel opts={{ align: "start", loop: true }} className="relative w-full">
      <CarouselContent>
        {items.map((card, index) => (
          <CarouselItem
            key={(card.key ?? card.title) + index}
            className="basis-full px-2"
          >
            {/* dacă avem groupedItems, afișăm un slide special cu mini-carduri */}
            {card.groupedItems && card.groupedItems.length ? (
              <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm p-6">
                <h3 className="mb-4 text-lg font-semibold">{card.title}</h3>
                <p className="mb-6 text-sm text-neutral-600">
                  {card.description}
                </p>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                  {card.groupedItems.map((g, gi) => (
                    <div
                      key={g.key ?? g.title + gi}
                      className="flex flex-col overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50"
                    >
                      <div className="relative aspect-[16/9] w-full">
                        {g.imageSrc ? (
                          <Image
                            src={g.imageSrc}
                            alt={g.imageAlt ?? g.title}
                            fill
                            className="object-cover"
                            sizes="(min-width: 768px) 33vw, 100vw"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="px-4 py-3">
                        <h4 className="text-sm font-semibold">{g.title}</h4>
                        <p className="mt-2 text-xs text-neutral-600">
                          {g.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ) : (
              // fallback: card normal (același markup ca înainte pentru un singur card)
              <article className="grid gap-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm md:grid-cols-2">
                <div className="relative min-h-[220px] md:min-h-[320px]">
                  {renderCardImageArea(card, `outer-${index}`)}
                </div>

                <div className="flex flex-col px-6 pb-6 pt-6 md:px-8 md:pt-8">
                  <div className="mb-4 h-[3px] w-16 bg-[#FFD500]" />
                  <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                    {card.title}
                  </h3>
                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-neutral-700">
                    {card.description}
                  </p>
                  {card.href && ctaLabel && (
                    <div className="mt-5">
                      <Link
                        href={card.href}
                        className="inline-flex items-center gap-2 rounded-full border border-[#FFD500] px-5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#FFD500] transition hover:bg-[#FFD500] hover:text-neutral-900"
                      >
                        {ctaLabel}
                        <span aria-hidden>↗</span>
                      </Link>
                    </div>
                  )}
                </div>
              </article>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 shadow-md hover:bg-amber-50" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 shadow-md hover:bg-amber-50" />
    </Carousel>
  );
}

/* ---------- Helper: render image area (single image or inner carousel) ---------- */
function renderCardImageArea(card: ServiceShowcaseItem, idBase: string) {
  const imgs: SlideImage[] =
    card.images && card.images.length
      ? card.images
      : card.imageSrc
      ? [{ src: card.imageSrc, alt: card.imageAlt }]
      : [];

  if (!imgs.length) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-neutral-50">
        <span className="text-sm text-neutral-400">No image</span>
      </div>
    );
  }

  // If only one image, render regular next/image for best performance
  if (imgs.length === 1) {
    return (
      <Image
        src={imgs[0].src}
        alt={imgs[0].alt ?? card.title}
        fill
        className="object-cover"
        sizes="(min-width: 768px) 50vw, 100vw"
      />
    );
  }

  // If multiple images, render small carousel inside the image area
  return (
    <Carousel
      className="relative h-full w-full"
      opts={{ align: "center", loop: true }}
    >
      <CarouselContent>
        {imgs.map((img, i) => (
          <CarouselItem
            key={`${idBase}-img-${i}`}
            className="basis-full relative min-h-[220px] md:min-h-[320px]"
          >
            <Image
              src={img.src}
              alt={img.alt ?? `${card.title} ${i + 1}`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* small nav for inner carousel */}
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1 shadow-sm" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1 shadow-sm" />
    </Carousel>
  );
}

/* ---------- USAGE EXAMPLES ----------

- To render grid (2 cols desktop, 1 col mobile) and some cards with image carousels:

<ServiceShowcaseSection
  id="subservicii"
  eyebrow={t("eyebrow")}
  title={t("title")}
  intro={t("intro")}
  ctaLabel={t("ctaLabel")}
  items={items}
/>

- To render the whole section as a single outer carousel (one card per slide):

<ServiceShowcaseSection
  id="subservicii"
  eyebrow={t("eyebrow")}
  title={t("title")}
  intro={t("intro")}
  ctaLabel={t("ctaLabel")}
  items={items}
  useCarousel
/>

Where `items` can include either `imageSrc` (single image) or `images: [{src, alt}, ...]` for an inner image carousel inside each card.

*/
