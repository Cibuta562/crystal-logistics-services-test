"use client";
// import next-intl
import { useTranslations } from "next-intl";

// HERO SECTION
import PageHero from "@/components/site/PageHero";

// FORM _ REQUEST A QUOTE
import RequestQuoteSection from "@/components/site/RequestQuoteSection";

// ACCORDION
import AccordionSection, {
  AccordionItemData,
} from "@/components/site/AccordionSection";

// WHY WORK WITH US
import WhyWorkWithUsSection from "@/components/site/WhyWorkWithUsSection";

// CONTACT CTA
import ContactCtaSection from "@/components/site/ContactCtaSection";

// FOOTER
import Footer from "@/components/site/Footer";

// MISC
import Image from "next/image";

import NewsletterFormSection from "@/components/site/NewsletterFormSection";
import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

const SECTION_CONTAINER = "mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:px-12";

export default function TransportMaritimPage() {
  const t = useTranslations("Transport.Maritim");

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      // când dă PLAY: PORNEȘTE CU SUNET
      videoRef.current.muted = false;
      setIsMuted(false);

      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const CONTAINER_40_ITEMS = [
    "standard",
    "openTop",
    "flatRack",
    "reefer",
    "highCube",
  ] as const;
  const CONTAINER_20_ITEMS = [
    "standard",
    "openTop",
    "flatRack",
    "reefer",
  ] as const;

  const items: AccordionItemData[] = [
    {
      id: "class1",
      title: t("Accordion.items.class1.title"),
      paragraphs: t.raw("Accordion.items.class1.paragraphs") as string[],
    },
    {
      id: "class2",
      title: t("Accordion.items.class2.title"),
      paragraphs: t.raw("Accordion.items.class2.paragraphs") as string[],
    },
    {
      id: "class3",
      title: t("Accordion.items.class3.title"),
      paragraphs: t.raw("Accordion.items.class3.paragraphs") as string[],
    },
    {
      id: "class4",
      title: t("Accordion.items.class4.title"),
      paragraphs: t.raw("Accordion.items.class4.paragraphs") as string[],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Schimbă background aici */}
      <PageHero
        eyebrow={t("Header.section")}
        title={t("Header.title")}
        imageSrc="/images/transport-maritim/transport-container-maritim.webp"
        imageAlt={t("Header.alt")}
        imageClassName="object-cover object-center"
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-stretch">
          {/* LEFT TEXT */}
          <div className="flex flex-col justify-center space-y-5">
            <div className="mb-0 h-[3px] w-16 bg-[#FFD500]" />
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("section_1.title")}
            </h2>

            {(t.raw("section_1.paragraphs") as string[]).map((p, i) => (
              <p key={i} className="text-neutral-700 leading-relaxed">
                {p}
              </p>
            ))}

            <span
              className="absolute inset-0 bg-yellow-400 scale-x-0 origin-left
                           group-hover:scale-x-100 transition-transform duration-500 ease-out"
            />
          </div>

          {/* RIGHT VIDEO */}
          <div className="flex flex-col justify-center gap-4">
            {/* VIDEO FĂRĂ AUTOPLAY + PLAY/PAUSE + UNMUTE */}
            <div className="relative h-[70vh] md:h-[70vh] rounded-2xl overflow-hidden shadow-xl group">
              <video
                ref={videoRef}
                src="/videos/maritim.webm"
                muted={isMuted}
                loop
                playsInline
                className="w-full h-full object-cover"
              />

              {/* PLAY / PAUSE BUTTON */}
              <button
                onClick={handlePlayPause}
                className="
        absolute inset-0 flex items-center justify-center
        bg-black/0 group-hover:bg-black/30 transition
      "
              >
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {isPlaying ? (
                    <Pause className="w-16 h-16 text-white" />
                  ) : (
                    <Play className="w-16 h-16 text-white" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <RequestQuoteSection />

      <AccordionSection
        sectionTitle={t("Accordion.title")}
        sectionIntro={t("Accordion.intro")}
        items={items}
        defaultValue="class1"
      />

      <section className="bg-white text-neutral-900">
        <div className={`${SECTION_CONTAINER} py-10`}>
          {/* header */}
          <div className="mb-5">
            <div className="mb-4 h-[3px] w-16 bg-[#FFD500]" />
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              {t("fclHero.title")}
            </h2>
          </div>

          <div className="overflow-hidden rounded-xl shadow-lg">
            <div className="relative aspect-[21/9] w-full">
              <Image
                src="/images/transport-maritim/transport-maritim.webp"
                alt={t("fclHero.alt")}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-neutral-900">
        <div className={`${SECTION_CONTAINER} py-16`}>
          <div className="mb-12">
            <div className="mb-4 h-[3px] w-16 bg-[#FFD500]" />
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              {t("container40.title")}
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
            {CONTAINER_40_ITEMS.map((key) => {
              const specs = t.raw(`container40.items.${key}.specs`) as string[];

              return (
                <div
                  key={key}
                  className="flex flex-col text-[15px] leading-relaxed text-neutral-700"
                >
                  <div className="mb-6">
                    <div className="mb-3 h-[3px] w-12 bg-[#FFD500]" />
                    <h3 className="text-lg font-semibold tracking-[0.18em] uppercase text-neutral-900">
                      {t(`container40.items.${key}.title`)}
                    </h3>
                  </div>

                  <p className="mb-6">
                    {t(`container40.items.${key}.description`)}
                  </p>

                  <ul className="space-y-1">
                    {specs.map((item, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="mt-[7px] inline-block h-[6px] w-[6px] rounded-full bg-[#FFD500]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-white text-neutral-900">
        <div className={`${SECTION_CONTAINER} py-16`}>
          <div className="mb-12">
            <div className="mb-4 h-[3px] w-16 bg-[#FFD500]" />
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              {t("container20.title")}
            </h2>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {CONTAINER_20_ITEMS.map((key) => {
              const specs = t.raw(`container20.items.${key}.specs`) as string[];

              return (
                <div
                  key={key}
                  className="flex flex-col text-[15px] leading-relaxed text-neutral-700"
                >
                  <div className="mb-6">
                    <div className="mb-3 h-[3px] w-12 bg-[#FFD500]" />
                    <h3 className="text-lg font-semibold tracking-[0.18em] uppercase text-neutral-900">
                      {t(`container20.items.${key}.title`)}
                    </h3>
                  </div>

                  <ul className="space-y-1">
                    {specs.map((item, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="mt-[7px] inline-block h-[6px] w-[6px] rounded-full bg-[#FFD500]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white text-neutral-900">
        <div className={`${SECTION_CONTAINER} py-16`}>
          <div className="mb-8">
            <div className="mb-4 h-[3px] w-16 bg-[#FFD500]" />
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {t("worldServices.title")}
            </h2>
            <p className="mt-4 max-w-5xl text-[15px] leading-relaxed text-neutral-700">
              {t("worldServices.description")}
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 text-[15px] leading-relaxed text-neutral-700">
            <ul className="space-y-2">
              {(t.raw("worldServices.columns.left") as string[]).map(
                (item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="mt-[7px] inline-block h-[6px] w-[6px] rounded-full bg-[#FFD500]" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>

            <ul className="space-y-2">
              {(t.raw("worldServices.columns.right") as string[]).map(
                (item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="mt-[7px] inline-block h-[6px] w-[6px] rounded-full bg-[#FFD500]" />
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>

      <WhyWorkWithUsSection />

      <NewsletterFormSection />

      <ContactCtaSection
        title={t("cta.title")}
        messages={t.raw("cta.messages") as string[]}
        buttonLabel={t("cta.buttonLabel")}
        href="/contact"
      />

      <Footer />
    </main>
  );
}
