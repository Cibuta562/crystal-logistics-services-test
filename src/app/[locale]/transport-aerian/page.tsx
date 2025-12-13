"use client";
// import next-intl
import { useTranslations } from "next-intl";

// HERO SECTION
import PageHero from "@/components/site/PageHero";

// CONTENT SPLIT SECTION
import { ContentSplitLeft } from "@/components/site/ContentSplitSection";

// FORM _ REQUEST A QUOTE
import RequestQuoteSection from "@/components/site/RequestQuoteSection";

// FLIP CARDS
import FlipCardsSection, {
  FlipCardItem,
} from "@/components/site/FlipCardsSection";

// FEATURES
import FeatureHighlightSection, {
  FeatureItem,
} from "@/components/site/FeatureHighlightSection";

// ACCORDION
import AccordionSection, {
  AccordionItemData,
} from "@/components/site/AccordionSection";

// NEWSLETTER
import NewsletterFormSection from "@/components/site/NewsletterFormSection";

// WHY WORK WITH US
import WhyWorkWithUsSection from "@/components/site/WhyWorkWithUsSection";

// CONTACT CTA
import ContactCtaSection from "@/components/site/ContactCtaSection";

// FOOTER
import Footer from "@/components/site/Footer";

import {
  Globe2,
  TimerReset,
  Plane,
  Accessibility,
  Handshake,
  Users,
  Pause,
  Play,
} from "lucide-react";
import { useRef, useState } from "react";

export default function TransportAerianPage() {
  const t = useTranslations("Transport.Aerian");

  const AERIAN_CARDS: FlipCardItem[] = [
    {
      icon: TimerReset,
      title: t("cards.items.card1.title"),
      short: t("cards.items.card1.short"),
      descriptions: t.raw("cards.items.card1.descriptions") as string[],
    },
    {
      icon: Plane,
      title: t("cards.items.card2.title"),
      short: t("cards.items.card2.short"),
      descriptions: t.raw("cards.items.card2.descriptions") as string[],
    },
    {
      icon: Globe2,
      title: t("cards.items.card3.title"),
      short: t("cards.items.card3.short"),
      descriptions: t.raw("cards.items.card3.descriptions") as string[],
    },
  ];

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
      id: "card4",
      title: t("Accordion.items.class4.title"),
      paragraphs: t.raw("Accordion.items.class4.paragraphs") as string[],
    },
  ];

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

  const AERIAN_FEATURES: FeatureItem[] = [
    {
      icon: Globe2,
      title: t("highlight.items.card1.title"),
      description: t("highlight.items.card1.description"),
    },
    {
      icon: Accessibility,
      title: t("highlight.items.card2.title"),
      description: t("highlight.items.card2.description"),
    },
    {
      icon: Handshake,
      title: t("highlight.items.card3.title"),
      description: t("highlight.items.card3.description"),
    },
    {
      icon: Users,
      title: t("highlight.items.card4.title"),
      description: t("highlight.items.card4.description"),
    },
  ];
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Schimbă background aici */}
      <PageHero
        eyebrow={t("Header.section")}
        title={t("Header.title")}
        imageSrc="/images/transport-aerian/transport-aerian.webp"
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
                src="/videos/aerian.webm"
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

      <FlipCardsSection title={t("cards.items.title")} items={AERIAN_CARDS} />

      <FeatureHighlightSection
        eyebrow={t("highlight.eyebrow")}
        title={t("highlight.title")}
        description={t("highlight.description")}
        items={AERIAN_FEATURES}
      />

      <ContentSplitLeft
        title={t("section_2.title")}
        paragraphs={t.raw("section_2.paragraphs") as string[]}
        imageSrc="/images/transport-aerian/transport-fragil.webp"
        imageAlt={t("section_2.alt")}
        headingLevel="h1"
      />

      <AccordionSection
        sectionTitle={t("Accordion.title")}
        sectionIntro={t("Accordion.intro")}
        items={items}
        defaultValue="class1"
      />

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
